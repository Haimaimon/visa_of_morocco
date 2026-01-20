# ויזה למרוקו - Visa Morocco Website

אתר לבקשת ויזה למרוקו שנבנה עם React, TypeScript ו-Convex.

## תכונות

- ✅ טופס בקשה עם ולידציה מלאה
- ✅ העלאת תמונות דרכון ופנים
- ✅ מערכת תשלומים (מוכן לאינטגרציה)
- ✅ מעקב אחר סטטוס בקשה
- ✅ לוח בקרה למנהלים
- ✅ עיצוב מודרני ונגיש
- ✅ תמיכה בעברית עם RTL

## טכנולוגיות

- **React 18** - ספריית UI
- **TypeScript** - טיפוסיות חזקה
- **Convex** - Backend serverless
- **React Hook Form** - ניהול טפסים
- **Zod** - ולידציה
- **Tailwind CSS** - עיצוב
- **Lucide React** - אייקונים
- **React Router** - ניווט

## התקנה

1. התקן את התלויות:
```bash
npm install
```

2. הגדר Convex:
```bash
npx convex dev
```

3. צור קובץ `.env.local` והוסף:
```
VITE_CONVEX_URL=<your-convex-url>
```

4. הרץ את השרת המקומי:
```bash
npm run dev
```

## מבנה הפרויקט

```
visaofmorocco/
├── src/
│   ├── components/      # רכיבים מודולריים
│   ├── pages/          # דפים
│   ├── lib/            # כלי עזר ולידציה
│   └── main.tsx
├── convex/
│   ├── schema.ts       # סכמת DB
│   ├── mutations.ts    # מוטציות
│   ├── queries.ts      # שאילתות
│   └── fileUpload.ts   # העלאת קבצים
└── public/
```

## עקרונות פיתוח

- ✅ **SOLID Principles** - כל רכיב עם אחריות אחת
- ✅ **Modular Architecture** - רכיבים נפרדים וניתנים לשימוש חוזר
- ✅ **Type Safety** - TypeScript עם Zod validation
- ✅ **Accessibility** - תמיכה ב-WCAG
- ✅ **Responsive Design** - עיצוב מותאם למובייל

## הערות

- יש להתקין ולגדר Convex לפני הרצה
- מערכת התשלומים מוכנה לאינטגרציה (Stripe/PayPal וכו')
- העלאת הקבצים משתמשת ב-Convex Storage