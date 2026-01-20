import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

/**
 * Send email notification to applicant
 * Uses a simple HTTP-based email service
 * For production, integrate with Resend, SendGrid, or similar service
 */
export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  handler: async (_ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Visa Morocco <onboarding@resend.dev>", // Change to your verified domain
            to: args.to,
            subject: args.subject,
            html: args.html,
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error("Resend API error:", data);
          
          // Check if it's a domain verification issue
          if (data.statusCode === 403 && data.name === 'validation_error') {
            console.error("❌ Domain not verified in Resend!");
            console.error("📝 To fix this:");
            console.error("1. Go to https://resend.com/domains");
            console.error("2. Verify your domain");
            console.error("3. Update the 'from' address in convex/emails.ts");
            console.error(`4. Currently trying to send to: ${args.to}`);
            console.error(`5. Your verified email: haimaimon5@gmail.com`);
          }
          
          // Fallback to logging if API fails
          console.log("📧 Email failed to send, logged instead:", {
            to: args.to,
            subject: args.subject,
          });
          return { success: false, error: data };
        }
        
        console.log("✅ Email sent successfully via Resend:", data);
        return { success: true, data };
      } catch (error) {
        console.error("Error sending email:", error);
        // Fallback to logging if request fails
        console.log("📧 Email failed to send, logged instead:", {
          to: args.to,
          subject: args.subject,
        });
        return { success: false, error: String(error) };
      }
    }
    
    // Fallback if no API key is set
    console.log("📧 RESEND_API_KEY not set, email logged:", {
      to: args.to,
      subject: args.subject,
    });
    return { success: false, message: "RESEND_API_KEY not configured" };
  },
});

/**
 * Send confirmation email after application submission
 */
export const sendApplicationConfirmationEmail = action({
  args: {
    email: v.string(),
    fullName: v.string(),
    applicationId: v.id("visaApplications"),
  },
  handler: async (ctx, args): Promise<{ success: boolean; data?: any; error?: any; message?: string }> => {
    const statusUrl = `${process.env.SITE_URL || "http://localhost:5173"}/status/${args.applicationId}`;
    
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ויזה למרוקו</h1>
          </div>
          <div class="content">
            <h2>שלום ${args.fullName},</h2>
            <p>תודה על הגשת הבקשה לויזה למרוקו!</p>
            <p>הבקשה שלך התקבלה בהצלחה וקיבלה את המספר:</p>
            <p style="font-weight: bold; font-size: 18px; text-align: center; padding: 10px; background: white; border: 2px solid #0ea5e9; border-radius: 6px;">
              ${args.applicationId}
            </p>
            <p>כעת עליך לבצע תשלום כדי להמשיך בעיבוד הבקשה.</p>
            <p style="text-align: center;">
              <a href="${statusUrl}" class="button">עקוב אחרי הבקשה שלך</a>
            </p>
            <p>אתה יכול לעקוב אחרי סטטוס הבקשה שלך בכל עת באמצעות הקישור לעיל או על ידי כניסה לדף העקיבה באתר.</p>
            <p>בברכה,<br>צוות ויזה למרוקו</p>
          </div>
          <div class="footer">
            <p>© 2026 ויזה למרוקו - כל הזכויות שמורות</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Call sendEmail action (can be internal action or external service)
    return await ctx.runAction(api.emails.sendEmail, {
      to: args.email,
      subject: "בקשה לויזה למרוקו התקבלה - יש לבצע תשלום",
      html,
    });
  },
});

/**
 * Send payment confirmation email
 */
export const sendPaymentConfirmationEmail = action({
  args: {
    email: v.string(),
    fullName: v.string(),
    applicationId: v.id("visaApplications"),
  },
  handler: async (ctx, args): Promise<{ success: boolean; data?: any; error?: any }> => {
    const statusUrl = `${process.env.SITE_URL || "http://localhost:5173"}/status/${args.applicationId}`;
    
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ תשלום התקבל</h1>
          </div>
          <div class="content">
            <h2>שלום ${args.fullName},</h2>
            <p>התשלום שלך התקבל בהצלחה!</p>
            <p>הבקשה שלך מספר <strong>${args.applicationId}</strong> נמצאת כעת בעיבוד.</p>
            <p>תוך כמה ימי עסקים תקבל עדכון על הסטטוס של הבקשה.</p>
            <p style="text-align: center;">
              <a href="${statusUrl}" class="button">עקוב אחרי הבקשה שלך</a>
            </p>
            <p>בברכה,<br>צוות ויזה למרוקו</p>
          </div>
          <div class="footer">
            <p>© 2026 ויזה למרוקו - כל הזכויות שמורות</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await ctx.runAction(api.emails.sendEmail, {
      to: args.email,
      subject: "תשלום התקבל - הבקשה שלך בעיבוד",
      html,
    });
  },
});

/**
 * Send status update email
 */
export const sendStatusUpdateEmail = action({
  args: {
    email: v.string(),
    fullName: v.string(),
    applicationId: v.id("visaApplications"),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ success: boolean; data?: any; error?: any }> => {
    const statusUrl = `${process.env.SITE_URL || "http://localhost:5173"}/status/${args.applicationId}`;
    
    const statusMessages: Record<string, { title: string; message: string; color: string }> = {
      processing: {
        title: "הבקשה בעיבוד",
        message: "הבקשה שלך נמצאת כעת בעיבוד על ידי הצוות.",
        color: "#0284c7",
      },
      approved: {
        title: "הבקשה אושרה",
        message: "הבקשה שלך אושרה והויזה מוכנה!",
        color: "#10b981",
      },
      completed: {
        title: "הויזה מוכנה",
        message: "הויזה שלך מוכנה וניתן להוריד אותה!",
        color: "#10b981",
      },
      rejected: {
        title: "הבקשה נדחתה",
        message: "לצערנו, הבקשה שלך נדחתה. אנא צור איתנו קשר לפרטים נוספים.",
        color: "#ef4444",
      },
    };

    const statusInfo = statusMessages[args.status] || {
      title: "עדכון סטטוס",
      message: "הסטטוס של הבקשה שלך עודכן.",
      color: "#6b7280",
    };

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; direction: rtl; text-align: right; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${statusInfo.color}; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: ${statusInfo.color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
          .notes { background: white; padding: 15px; border-right: 4px solid ${statusInfo.color}; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${statusInfo.title}</h1>
          </div>
          <div class="content">
            <h2>שלום ${args.fullName},</h2>
            <p>${statusInfo.message}</p>
            <p>מספר בקשה: <strong>${args.applicationId}</strong></p>
            ${args.notes ? `<div class="notes"><strong>הערות:</strong><br>${args.notes}</div>` : ""}
            <p style="text-align: center;">
              <a href="${statusUrl}" class="button">צפה בסטטוס הבקשה</a>
            </p>
            <p>בברכה,<br>צוות ויזה למרוקו</p>
          </div>
          <div class="footer">
            <p>© 2026 ויזה למרוקו - כל הזכויות שמורות</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await ctx.runAction(api.emails.sendEmail, {
      to: args.email,
      subject: `${statusInfo.title} - בקשה ${args.applicationId}`,
      html,
    });
  },
});
