# הוראות פריסה לשרת חינמי

## אפשרויות שרתים חינמיים:

### 1. Netlify (מומלץ - פשוט מאוד) ⭐

#### שלב 1: העלה את הקוד ל-GitHub

```bash
# אם עדיין לא יצרת repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/visaofmorocco.git
git push -u origin main
```

#### שלב 2: פרוס ב-Netlify

1. היכנס ל-Netlify: https://app.netlify.com
2. הירשם/התחבר (אפשר עם GitHub)
3. לחץ על "Add new site" → "Import an existing project"
4. בחר "Deploy with GitHub"
5. בחר את ה-repository שלך (visaofmorocco)
6. Netlify יזהה אוטומטית את ההגדרות מקובץ `netlify.toml`
7. לחץ "Deploy site"

#### שלב 3: הגדר Environment Variables

1. בדף הפרויקט, לך ל-Site settings → Environment variables
2. לחץ "Add a variable"
3. הוסף:
   - Key: `VITE_CONVEX_URL`
   - Value: כתובת ה-Convex שלך (מהקונסול של Convex)

#### שלב 4: עדכן את Convex

```bash
npx convex env set SITE_URL "https://your-app.netlify.app"
```

---

### 2. Cloudflare Pages (מהיר מאוד) ⚡

#### שלב 1: העלה את הקוד ל-GitHub (כנ"ל)

#### שלב 2: פרוס ב-Cloudflare Pages

1. היכנס ל-Cloudflare Dashboard: https://dash.cloudflare.com
2. בחר "Pages" מהתפריט
3. לחץ "Create a project" → "Connect to Git"
4. בחר את ה-repository שלך
5. הגדר:
   - Project name: `visaofmorocco`
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
6. לחץ "Save and Deploy"

#### שלב 3: הגדר Environment Variables

1. בדף הפרויקט, לך ל-Settings → Environment variables
2. הוסף:
   - `VITE_CONVEX_URL` = כתובת ה-Convex שלך

#### שלב 4: עדכן את Convex

```bash
npx convex env set SITE_URL "https://your-app.pages.dev"
```

---

### 3. Render (חינמי עם SSL) 🚀

#### שלב 1: העלה את הקוד ל-GitHub

#### שלב 2: פרוס ב-Render

1. היכנס ל-Render: https://render.com
2. הירשם/התחבר (אפשר עם GitHub)
3. לחץ "New +" → "Static Site"
4. בחר את ה-repository שלך
5. הגדר:
   - Name: `visaofmorocco`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. לחץ "Create Static Site"

#### שלב 3: הגדר Environment Variables

1. בדף הפרויקט, לך ל-Environment
2. הוסף:
   - `VITE_CONVEX_URL` = כתובת ה-Convex שלך

---

### 4. Vercel (קל מאוד) 🎯

1. היכנס ל-Vercel: https://vercel.com
2. לחץ "Add New Project"
3. בחר את ה-repository שלך
4. Vercel יזהה אוטומטית - לחץ "Deploy"
5. הגדר `VITE_CONVEX_URL` ב-Environment Variables

---

## השוואה:

| שירות | מהירות | קלות שימוש | דומיין חינמי |
|-------|--------|-----------|-------------|
| **Netlify** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ `*.netlify.app` |
| **Cloudflare Pages** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ `*.pages.dev` |
| **Render** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ `*.onrender.com` |
| **Vercel** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ `*.vercel.app` |

## המלצה:

**Netlify** - הכי פשוט לשימוש, תמיכה מעולה, ומגיע עם כל מה שצריך.

## לאחר הפריסה:

1. ✅ האתר יהיה זמין בכתובת החינמית
2. ✅ כל עדכון ב-GitHub יתעדכן אוטומטית
3. ✅ HTTPS מופעל אוטומטית
4. ✅ CDN גלובלי מהיר

## בדיקה מקומית לפני פריסה:

```bash
npm run build
npm run preview
```

זה יבנה את הפרויקט ויראה לך איך זה ייראה בפרודקשן.
