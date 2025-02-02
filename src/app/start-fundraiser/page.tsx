"use client"

import { useState } from "react"
import { useForm, type SubmitHandler, FormProvider, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"


type FormData = {
  email: string
  password: string
  fundType: string
  beneficiary: string
  phone: string
  fundraiserName: string
  goalAmount: string
  title: string
  category: string
  bankDetails: {
    accountNumber: string
    ifscCode: string
    branchAddress: string
  }
  deadline: string
  fundraiserImage: FileList | string
  medicalDocuments: FileList | string[]
}

const steps = [
  { title: "Basic Info", icon: "1" },
  { title: "Fundraiser Details", icon: "2" },
  { title: "Documents", icon: "3" },
]


function FormStep({ step }: { step: number }) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FormData>()

  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      {step === 1 && (
        <div className="space-y-4">
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="fundType">I am raising fund for</Label>
            <Select onValueChange={(value) => setValue("fundType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fund type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600">
                <SelectItem value="medical" className="text-white">
                  Medical
                </SelectItem>
                <SelectItem value="education" className="text-white">
                  Education
                </SelectItem>
                <SelectItem value="emergency" className="text-white">
                  Emergency
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.fundType && <p className="text-red-500 text-sm mt-1">{errors.fundType.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="beneficiary">I am raising fund to help</Label>
            <Select onValueChange={(value) => setValue("beneficiary", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select beneficiary" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600">
                <SelectItem value="myself" className="text-white">
                  Myself
                </SelectItem>
                <SelectItem value="family" className="text-white">
                  Family Member
                </SelectItem>
                <SelectItem value="friend" className="text-white">
                  Friend
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.beneficiary && <p className="text-red-500 text-sm mt-1">{errors.beneficiary.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your mobile number"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="fundraiserName">Fundraiser Name</Label>
            <Input id="fundraiserName" {...register("fundraiserName", { required: "Fundraiser name is required" })} />
            {errors.fundraiserName && <p className="text-red-500 text-sm mt-1">{errors.fundraiserName.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="goalAmount">Goal Amount</Label>
            <Input id="goalAmount" type="number" {...register("goalAmount", { required: "Goal amount is required" })} />
            {errors.goalAmount && <p className="text-red-500 text-sm mt-1">{errors.goalAmount.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-600">
                <SelectItem value="heart" className="text-white">
                  Heart
                </SelectItem>
                <SelectItem value="kidney" className="text-white">
                  Kidney
                </SelectItem>
                <SelectItem value="medical" className="text-white">
                  Medical
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="deadline">Fundraiser Deadline</Label>
            <Input
              id="deadline"
              type="date"
              min={today}
              {...register("deadline", {
                required: "Deadline is required",
                validate: (value) => new Date(value) > new Date() || "Deadline must be greater than today's date",
              })}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              {...register("bankDetails.accountNumber", { required: "Account number is required" })}
            />
            {errors.bankDetails?.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.bankDetails.accountNumber.message}</p>
            )}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" {...register("bankDetails.ifscCode", { required: "IFSC code is required" })} />
            {errors.bankDetails?.ifscCode && (
              <p className="text-red-500 text-sm mt-1">{errors.bankDetails.ifscCode.message}</p>
            )}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="branchAddress">Branch Address</Label>
            <Textarea
              id="branchAddress"
              {...register("bankDetails.branchAddress", { required: "Branch address is required" })}
            />
            {errors.bankDetails?.branchAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.bankDetails.branchAddress.message}</p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="fundraiserImage">Fundraiser Image</Label>
            <Input
              id="fundraiserImage"
              type="file"
              accept="image/*"
              {...register("fundraiserImage", { required: "Fundraiser image is required" })}
            />
            {errors.fundraiserImage && <p className="text-red-500 text-sm mt-1">{errors.fundraiserImage.message}</p>}
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <Label htmlFor="medicalDocuments">Medical Documents (JPG)</Label>
            <Input
              id="medicalDocuments"
              type="file"
              accept=".jpg,.jpeg"
              multiple
              {...register("medicalDocuments", { required: "At least one medical document is required" })}
            />
            {errors.medicalDocuments && <p className="text-red-500 text-sm mt-1">{errors.medicalDocuments.message}</p>}
          </div>
          <p className="text-sm text-gray-500">
            You can upload multiple documents. Select all the files you want to upload at once.
          </p>
        </div>
      )}
    </>
  )
}

export default function FundraiserForm() {
  const [step, setStep] = useState(1)
  const [backendError, setBackendError] = useState<string | null>(null)
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      fundType: "",
      beneficiary: "",
      phone: "",
      fundraiserName: "",
      goalAmount: "",
      title: "",
      category: "",
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        branchAddress: "",
      },
      deadline: "",
      fundraiserImage: "",
      medicalDocuments: [],
    },
  })

  const { handleSubmit, trigger, getValues } = methods
 // Step 1 auth using Email and password
  const validateFirstStep = async () => {
    return true;
    // const isValid = await trigger(["email", "password"])
    // if (isValid) {
    //   const { email, password } = getValues()
    //   try {
    //     const response = await fetch("/api/validate-user", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, password }),
    //     })
    //     if (response.ok) {
    //       setBackendError(null)
    //       return true
    //     } else {
    //       const errorData = await response.json()
    //       setBackendError(errorData.message || "Invalid email or password")
    //       return false
    //     }
    //   } catch (error) {
    //     console.error("Error validating user:", error)
    //     setBackendError("An error occurred while validating user credentials")
    //     return false
    //   }
    // }
    // return false
  }

  const nextStep = async () => {
    if (step === 1) {
      const isValidFirstStep = await validateFirstStep()
      if (isValidFirstStep) {
        setStep(2)
      }
    } else {
      const fields = getFieldsForStep(step)
      const isStepValid = await trigger(fields as (keyof FormData)[])
      if (isStepValid) {
        setStep((prev) => Math.min(prev + 1, 3))
      }
    }
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ["email", "password", "fundType", "beneficiary", "phone"]
      case 2:
        return [
          "fundraiserName",
          "goalAmount",
          "title",
          "category",
          "deadline",
          "bankDetails.accountNumber",
          "bankDetails.ifscCode",
          "bankDetails.branchAddress",
        ]
      case 3:
        return ["fundraiserImage", "medicalDocuments"]
      default:
        return []
    }
  }


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Create a new FormData instance
      const formData = new FormData();
  
      // Add all text fields
      Object.keys(data).forEach(key => {
        // Skip file fields as we'll handle them separately
        if (key !== 'fundraiserImage' && key !== 'medicalDocuments') {
          formData.append(key, data[key]);
        }
      });
  
      // Handle fundraiser image
      if (data.fundraiserImage instanceof FileList && data.fundraiserImage[0]) {
        formData.append('patientImage', data.fundraiserImage[0]); // Note: changed to match backend's expected field name
      }
  
      // Handle medical documents
      if (data.medicalDocuments instanceof FileList && data.medicalDocuments[0]) {
        formData.append('medicalDocument', data.medicalDocuments[0]); // Note: changed to match backend's expected field name
      }
  
      // Handle bank details if it's an object
      if (typeof data.bankDetails === 'object') {
        formData.append('bankDetails', JSON.stringify(data.bankDetails));
      }
  
      console.log('Form data being sent:', Object.fromEntries(formData));
  
      const response = await fetch("/api/fundraiser", {
        method: "POST",
        // Don't set Content-Type header - browser will set it automatically
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create fundraiser");
      }
  
      console.log("Fundraiser created successfully");
      const responseData = await response.json();
      console.log("Server response:", responseData);
   
  
    } catch (error) {
      console.error("Error:", error);
      setBackendError("An error occurred while creating the fundraiser");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-200 p-2 sm:p-4 flex items-center justify-center backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Start a Fundraiser</CardTitle>
          <p className="text-sm text-center text-muted-foreground">Complete the form to create your fundraiser</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.title} className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > index
                        ? "bg-green-500 text-white"
                        : step === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > index ? <CheckCircle2 className="w-3 h-3" /> : s.icon}
                  </div>
                  <p className="text-[10px] mt-1">{s.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-200">
              <div
                className="h-1 bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {backendError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{backendError}</div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data" className="space-y-3">
              <FormStep step={step} />
              <div className="flex justify-between mt-6 space-x-2">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep} className="w-1/2 text-sm bg-cyan-100">
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className={`${step === 1 ? "w-full" : "w-1/2"} text-sm  bg-green-400`}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="w-full text-sm  bg-green-400">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}


