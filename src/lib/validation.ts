import { z } from "zod";

export const visaApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "השם חייב להכיל לפחות 2 תווים")
    .max(100, "השם ארוך מדי")
    .regex(/^[\u0590-\u05FF\s]+$/, "השם חייב להכיל רק אותיות בעברית"),
  idNumber: z
    .string()
    .length(9, "מספר תעודת זהות חייב להכיל בדיוק 9 ספרות")
    .regex(/^\d+$/, "מספר תעודת זהות חייב להכיל רק ספרות"),
  passportNumber: z
    .string()
    .min(6, "מספר דרכון חייב להכיל לפחות 6 תווים")
    .max(20, "מספר דרכון ארוך מדי"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z
    .string()
    .regex(/^0[2-9]\d{7,8}$/, "מספר טלפון לא תקין (יש להתחיל ב-0)"),
  passportImage: z.instanceof(File, { message: "יש להעלות תמונת דרכון" }),
  personalImage: z.instanceof(File, { message: "יש להעלות תמונת פנים" }),
});

export type VisaApplicationFormData = z.infer<typeof visaApplicationSchema>;