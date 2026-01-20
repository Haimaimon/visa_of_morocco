import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { visaApplicationSchema, VisaApplicationFormData } from "@/lib/validation";
import { FormInput } from "@/components/FormInput";
import { FileUpload } from "@/components/FileUpload";
import { Loader2, CheckCircle } from "lucide-react";

export function ApplicationForm() {
  const navigate = useNavigate();
  const createApplication = useMutation(api.mutations.createVisaApplication);
  const generateUploadUrl = useMutation(api.fileUpload.generateUploadUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VisaApplicationFormData>({
    resolver: zodResolver(visaApplicationSchema),
    mode: "onBlur",
  });

  const passportImage = watch("passportImage");
  const personalImage = watch("personalImage");

  const uploadFile = async (file: File): Promise<string> => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const response = await result.json();
    // Extract storageId from response object
    // Convex returns {storageId: "..."} and we need just the ID string
    const storageId = typeof response === "object" && response.storageId 
      ? response.storageId 
      : typeof response === "string" 
        ? response 
        : String(response);
    return storageId as string;
  };

  const onSubmit = async (data: VisaApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload files
      const [passportImageStorageId, personalImageStorageId] = await Promise.all([
        uploadFile(data.passportImage),
        uploadFile(data.personalImage),
      ]);

      // Create application
      const applicationId = await createApplication({
        fullName: data.fullName,
        idNumber: data.idNumber,
        passportNumber: data.passportNumber,
        passportImageStorageId,
        personalImageStorageId,
        email: data.email,
        phone: data.phone,
      });

      // Navigate to payment page
      navigate(`/payment/${applicationId}`);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("אירעה שגיאה בהגשת הבקשה. נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-8">
          הגשת בקשה לויזה למרוקו
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="fullName"
            label="שם מלא"
            {...register("fullName")}
            error={errors.fullName?.message}
            required
            autoComplete="name"
          />

          <FormInput
            id="idNumber"
            label="מספר תעודת זהות"
            {...register("idNumber")}
            error={errors.idNumber?.message}
            required
            maxLength={9}
            inputMode="numeric"
          />

          <FormInput
            id="passportNumber"
            label="מספר דרכון"
            {...register("passportNumber")}
            error={errors.passportNumber?.message}
            required
          />

          <FormInput
            id="email"
            label="כתובת אימייל"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            required
            autoComplete="email"
          />

          <FormInput
            id="phone"
            label="מספר טלפון"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            required
            autoComplete="tel"
            inputMode="tel"
          />

          <FileUpload
            label="תמונת דרכון"
            value={passportImage}
            onChange={(file) => setValue("passportImage", file as File, { shouldValidate: true })}
            error={errors.passportImage?.message}
            required
            accept="image/*"
          />

          <FileUpload
            label="תמונת פנים"
            value={personalImage}
            onChange={(file) => setValue("personalImage", file as File, { shouldValidate: true })}
            error={errors.personalImage?.message}
            required
            accept="image/*"
          />

          {submitError && (
            <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg text-right">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>שולח...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>הגש בקשה</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}