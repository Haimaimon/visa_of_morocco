# תיקון שגיאת Build ב-Netlify

## הבעיה:
Netlify לא מוצא את הקבצים `convex/_generated/api` כי הם היו ב-.gitignore.

## הפתרון:
הסרתי את `convex/_generated/` מ-.gitignore כדי שהקבצים יישמרו ב-Git.

## צעדים:

1. **הוסף את הקבצים ל-Git:**
```bash
git add convex/_generated/
git commit -m "Add convex generated files for build"
git push
```

2. **Netlify יתבנה מחדש אוטומטית** עם הקבצים החדשים.

## הערה:
הקבצים האלה נוצרים על ידי Convex ומתעדכנים כשאתה משנה את הפונקציות ב-`convex/`.
חשוב לעדכן אותם ב-Git כשאתה משנה את הקוד ב-`convex/`.

## לפריסה הבאה:
לאחר שתעשה שינויים ב-`convex/`, הרץ:
```bash
npx convex dev --once  # יוצר את הקבצים
git add convex/_generated/
git commit -m "Update convex generated files"
git push
```
