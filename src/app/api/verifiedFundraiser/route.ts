import { NextResponse } from "next/server";
import VerifiedCamp from '@/models/verifiedFundCamp';
import { connectToDB } from "@/utils/database";

export async function GET(){

    try {
        await connectToDB();
        const campaigns = await VerifiedCamp.find({});
        return NextResponse.json(campaigns, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching campaigns' }, { status: 500 });
    }
}