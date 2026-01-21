# תיקון Build ב-Netlify

## הבעיה:
Netlify לא מוצא את הקבצים `convex/_generated/api` במהלך ה-build.

## הפתרון שיושם:

### 1. הוספתי `prebuild` script ל-package.json
זה יריץ `npx convex codegen` לפני כל build, כדי ליצור את הקבצים הנדרשים.

### 2. וודא שהקבצים ב-Git

**חשוב**: הקבצים `convex/_generated/*` צריכים להיות ב-Git. אם הם לא, הוסף אותם:

```bash
git add convex/_generated/
git commit -m "Add convex generated files"
git push
```

### 3. בדוק ב-Netlify

לאחר ה-push, Netlify יתבנה מחדש אוטומטית.

אם עדיין יש בעיה, בדוק ב-Netlify logs מה השגיאה המדויקת.

## הערות:

- ה-`prebuild` script ינסה להריץ `convex codegen` אבל אם זה לא עובד, זה לא יפריע (ה-`|| echo` מבטיח שהתהליך ימשיך)
- הקבצים האלה צריכים להיות ב-Git לפריסה מוצלחת
