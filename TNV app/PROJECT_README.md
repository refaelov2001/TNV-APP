# THE NEXT VERSION — מערכת ניהול מספרה

## מה זה
שלב 1 של מערכת SaaS לניהול מספרה. כרגע בנוי: שלד הפרויקט המלא + מסך הדשבורד הראשי, פועלים על **mock data** (נתוני דמו), בלי backend אמיתי.

## איך מריצים מקומית
1. ודאו שמותקן Node.js (גרסה 20 ומעלה).
2. בתיקיית הפרויקט הריצו בטרמינל:
   ```
   npm install
   npm run dev
   ```
3. פתחו בדפדפן: http://localhost:3000

## איך בודקים שאין שגיאות
```
npm run build
```
אם זה מסתיים ב-"✓ Compiled successfully" — הכל תקין.

## איך מעלים ל-Netlify
1. דחפו את הפרויקט ל-GitHub (repo חדש).
2. ב-Netlify: "Add new site" → "Import an existing project" → לבחור את ה-repo.
3. הגדרות build (Netlify יזהה אוטומטית כי זה Next.js):
   - Build command: `npm run build`
   - Publish directory: יוגדר אוטומטית ע"י Netlify (plugin של Next.js)
4. לחצו Deploy.

## איפה מחברים Supabase בעתיד
- כל הנתונים כרגע יושבים בקובץ `data/mock-data.ts`.
- כשתרצו לחבר Supabase: יוצרים `lib/supabase.ts` עם לקוח Supabase, ומחליפים בהדרגה כל ייבוא מ-`data/mock-data` בקריאות `await supabase.from(...)`.
- מבנה ה-Types בקובץ `types/index.ts` כבר תואם לטבלאות עתידיות (כל ID הוא מחרוזת/uuid, כל תאריך הוא ISO string) — בדיוק כפי ש-Supabase עובד.

## הקבצים המרכזיים
- `app/layout.tsx` — השלד הראשי: RTL, פונטים, Sidebar, Topbar.
- `app/page.tsx` — דף הדשבורד.
- `components/dashboard/` — כל רכיבי הדשבורד.
- `components/layout/` — Sidebar, Topbar, תפריט מובייל.
- `components/ui/` — רכיבי הבסיס (כפתורים, כרטיסים, דיאלוגים...).
- `data/mock-data.ts` — כל נתוני הדמו.
- `types/index.ts` — כל הטיפוסים של המערכת.
- `app/calendar`, `app/customers` וכו' — דפי "בקרוב" שיתמלאו במסכים הבאים.

## מה השלב הבא
לבנות מסך אחר מסך: יומן תורים → ניהול לקוחות → קופה ותשלומים → שאר המסכים, כל אחד בנפרד כדי לשמור על איכות גבוהה.
