# הוראות פריסה לשרת חינמי

## פריסה ל-Vercel (מומלץ - הכי קל)

### דרישות מוקדמות:
1. חשבון GitHub/GitLab/Bitbucket
2. חשבון Vercel (חינמי) - https://vercel.com

### שלב 1: העלה את הקוד ל-GitHub

```bash
# אם עדיין לא יצרת repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/visaofmorocco.git
git push -u origin main
```

### שלב 2: פרוס ב-Vercel

1. היכנס ל-Vercel: https://vercel.com
2. לחץ על "Add New Project"
3. בחר את ה-repository שלך (visaofmorocco)
4. Vercel יזהה אוטומטית את Vite - לחץ "Deploy"

### שלב 3: הגדר Environment Variables

בדף הפרויקט ב-Vercel:
1. לך ל-Settings → Environment Variables
2. הוסף:
   - `VITE_CONVEX_URL` = כתובת ה-Convex שלך (מהקונסול של Convex)

### שלב 4: עדכן את Convex

בקוד שלך, עדכן את `SITE_URL` ב-`convex/emails.ts`:
```typescript
const statusUrl = `${process.env.SITE_URL || "https://your-app.vercel.app"}/status/${args.applicationId}`;
```

או הוסף משתנה סביבה ב-Convex:
```bash
npx convex env set SITE_URL "https://your-app.vercel.app"
```

## אפשרויות נוספות:

### Netlify (חינמי)

1. העלה את הקוד ל-GitHub
2. היכנס ל-Netlify: https://netlify.com
3. לחץ "Add new site" → "Import an existing project"
4. בחר את ה-repository
5. הגדר:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Cloudflare Pages (חינמי)

1. העלה את הקוד ל-GitHub
2. היכנס ל-Cloudflare Dashboard
3. Pages → Create a project
4. בחר את ה-repository
5. הגדר:
   - Build command: `npm run build`
   - Build output directory: `dist`

## לאחר הפריסה:

1. ✅ האתר יהיה זמין בכתובת: `https://your-app.vercel.app`
2. ✅ כל עדכון ב-GitHub יתעדכן אוטומטית
3. ✅ HTTPS מופעל אוטומטית
4. ✅ CDN גלובלי מהיר

## הערות חשובות:

- Convex כבר רצ על שרת החינמי שלהם - אין צורך בשרת נפרד
- Vercel נותן דומיין חינמי: `your-app.vercel.app`
- אפשר להוסיף דומיין משלך בהמשך (גם חינמי)
- כל הפריסה היא אוטומטית - כל push ל-main מתעדכן

## בדיקה מקומית לפני פריסה:

```bash
npm run build
npm run preview
```

זה יבנה את הפרויקט ויראה לך איך זה ייראה בפרודקשן.
