import { connectToDB } from "@/utils/database";
import Fundraiser from "@/models/fundraiser";
import { verifyToken } from "@/utils/jwt";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { useRouter } from "next/navigation";

// Define types for request body
interface FundraiserData {
  title: string;
  description: string;
  goalAmount: string;
  patientName: string;
  category: string;
  beneficiary: string;
  deadline: string;
  bankDetails: string;
  patientImage: File | null;
  medicalDocument: File | null;
}


// Cloudinary Upload Function
const uploadToCloudinary = async (file: File | null, folder: string): Promise<string> => {
  if (!file) {
    throw new Error(`${folder} file is required`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Unknown Cloudinary upload failure"));
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// 🟢 **POST - Create a New Fundraiser**

export async function POST(req: NextRequest) {
  try {
    console.log("📌 Incoming POST request to create fundraiser");

    // Extract Token
    const token = req.cookies.get("authToken")?.value;
    console.log("📌 Extracted Token:", token);

    if (!token) {
      console.error("❌ No authentication token found");
      return NextResponse.json({ error: "Unauthorized: Token not provided" }, { status: 401 });
    }

    // Verify Token
    let decoded;
    try {
      decoded = verifyToken(token);
      console.log("📌 Decoded Token:", decoded);
    } catch (err) {
      console.error("❌ Invalid or expired token:", err);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const userID = decoded.id;
    console.log("📌 Authenticated User ID:", userID);

    // Connect to DB
    await connectToDB();
    console.log("📌 Connected to DB");

    // Parse FormData
    const formData = await req.formData();
    console.log("📌 Received FormData:", formData);

    // Extract and validate form fields
    const fundraiserData: FundraiserData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      goalAmount: formData.get("goalAmount") as string,
      patientName: formData.get("patientName") as string,
      category: formData.get("category") as string,
      beneficiary: formData.get("beneficiary") as string,
      deadline: formData.get("deadline") as string,
      bankDetails: formData.get("bankDetails") as string,
      patientImage: formData.get("patientImage") as File | null,
      medicalDocument: formData.get("medicalDocument") as File | null,
    };

    console.log("📌 Parsed FormData:", fundraiserData);

    // Check required fields
    const requiredFields: (keyof FundraiserData)[] = [
      "title",
      "goalAmount",
      "category",
      "beneficiary",
      "deadline",
      "bankDetails",
    ];

    for (const field of requiredFields) {
      if (!fundraiserData[field]) {
        console.error(`❌ Missing required field: ${field}`);
        return NextResponse.json({ error: `Field "${field}" is required` }, { status: 400 });
      }
    }

    console.log("📌 All required fields are present");

    // Upload Images to Cloudinary
    const [patientImageUrl, medicalDocumentUrl] = await Promise.all([
      uploadToCloudinary(fundraiserData.patientImage, "patient_images"),
      uploadToCloudinary(fundraiserData.medicalDocument, "medical_documents"),
    ]);

    console.log("📌 Image Upload Successful:", { patientImageUrl, medicalDocumentUrl });

    // Create Fundraiser
    const fundraiserID = uuidv4();

    const newFundraiser = new Fundraiser({
      title: fundraiserData.title,
      goalAmount: parseFloat(fundraiserData.goalAmount),
      patientImage: patientImageUrl,
      patientName: fundraiserData.patientName,
      medicalDocument: medicalDocumentUrl,
      bankDetails: fundraiserData.bankDetails,
      fundraiserID,
      category: fundraiserData.category,
      userID,
      beneficiary: fundraiserData.beneficiary,
      deadline: new Date(fundraiserData.deadline),
    });

    console.log("📌 Fundraiser Object Created:", newFundraiser);

    // Save to DB
    await newFundraiser.save();
    console.log("✅ Fundraiser successfully saved to DB");
  


    return NextResponse.json({ message: "Fundraiser created successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating fundraiser:", error);
    return NextResponse.json(
      { error: "Failed to create fundraiser", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


// 🟢 **GET - Fetch All Fundraisers**
export async function GET() {
  try {
    await connectToDB();

    const fundraisers = await Fundraiser.find({});
    return NextResponse.json(fundraisers, { status: 200 });
  } catch (error) {
    console.error("Error retrieving fundraisers:", error);
    return NextResponse.json(
      { error: "Failed to retrieve fundraisers", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// 🟢 **DELETE - Remove a Fundraiser**
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token not provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const userID = decoded.id;
    const url = new URL(req.url);
    const fundraiserID = url.searchParams.get("fundraiserID");

    if (!fundraiserID) {
      return NextResponse.json({ error: "Fundraiser ID is required" }, { status: 400 });
    }

    await connectToDB();

    // Fetch fundraiser
    const fundraiser = await Fundraiser.findOne({ fundraiserID });

    if (!fundraiser) {
      return NextResponse.json({ error: "Fundraiser not found" }, { status: 404 });
    }

    if (fundraiser.userID !== userID) {
      return NextResponse.json({ error: "Unauthorized: You cannot delete this fundraiser" }, { status: 403 });
    }

    // Delete fundraiser from DB
    await Fundraiser.deleteOne({ fundraiserID });

    return NextResponse.json({ message: "Fundraiser deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting fundraiser:", error);
    return NextResponse.json(
      { error: "Failed to delete fundraiser", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}





