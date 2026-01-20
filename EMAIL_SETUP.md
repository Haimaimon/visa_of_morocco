# הגדרת מערכת שליחת אימיילים

המערכת מוכנה לשליחת אימיילים, אבל כרגע היא רק מדפיסה ללוג (לפיתוח).

## להפעיל שליחת אימיילים אמיתית:

### אפשרות 1: Resend (מומלץ)

1. הירשם ל-Resend: https://resend.com
2. קבל API Key
3. הוסף ל-Convex Environment Variables:
   ```bash
   npx convex env set RESEND_API_KEY "re_xxxxx"
   ```
4. שחרר הערה בקוד ב-`convex/emails.ts` בשורות 19-34
5. שנה את `from` לכתובת האימייל שלך (חייב להיות מאומת ב-Resend)

### אפשרות 2: SendGrid

1. הירשם ל-SendGrid: https://sendgrid.com
2. קבל API Key
3. שנה את הקוד ב-`convex/emails.ts`:
   ```typescript
   const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
   const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${SENDGRID_API_KEY}`,
     },
     body: JSON.stringify({
       personalizations: [{ to: [{ email: args.to }] }],
       from: { email: "noreply@yourdomain.com" },
       subject: args.subject,
       content: [{ type: "text/html", value: args.html }],
     }),
   });
   ```

### אימיילים שנשלחים אוטומטית:

1. **אחרי הגשת בקשה** - הודעה עם מספר בקשה וקישור לעקיבה
2. **אחרי תשלום מוצלח** - אישור תשלום
3. **עדכון סטטוס** - הודעה כשהסטטוס משתנה (processing, approved, completed, rejected)

### בדיקה:

במצב פיתוח, האימיילים יודפסו בקונסול של Convex. תראה:
```
📧 Email would be sent: { to: "...", subject: "...", html: "..." }
```

### שינוי כתובת האתר:

אל תשכח לשנות את `SITE_URL` ב-`convex/emails.ts` או להוסיף משתנה סביבה:
```bash
npx convex env set SITE_URL "https://yourdomain.com"
```
