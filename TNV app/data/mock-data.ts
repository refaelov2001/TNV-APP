import type {
  Customer,
  Employee,
  Service,
  Appointment,
  Product,
  Payment,
  MessageTemplate,
  Campaign,
  BusinessSettings,
  DailyStat,
  AiInsight,
} from "@/types";

/* עוזר: בניית תאריך/שעה יחסית להיום, כדי שנתוני הדמו תמיד "יחיו" בהווה */
function todayAt(hour: number, minute = 0, dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const businessSettings: BusinessSettings = {
  name: "THE NEXT VERSION",
  logoInitial: "N",
  primaryColor: "#c97a3d",
  cancellationPolicy: "ביטול חינם עד 4 שעות לפני התור. לאחר מכן יחויב 50% ממחיר השירות.",
  requiresDeposit: true,
  address: "רוטשילד 22, תל אביב",
  phone: "03-9991234",
  openHours: [
    { day: "ראשון", active: true, start: "09:00", end: "20:00" },
    { day: "שני", active: true, start: "09:00", end: "20:00" },
    { day: "שלישי", active: true, start: "09:00", end: "20:00" },
    { day: "רביעי", active: true, start: "09:00", end: "20:00" },
    { day: "חמישי", active: true, start: "09:00", end: "21:00" },
    { day: "שישי", active: true, start: "08:00", end: "14:00" },
    { day: "שבת", active: false },
  ],
};

const fullWeek = (start: string, end: string) =>
  (["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"] as const).map((day) => ({
    day,
    active: day !== "שבת",
    start: day === "שישי" ? "08:00" : start,
    end: day === "שישי" ? "15:00" : end,
  }));

/* ---------- עובדים ---------- */

export const employees: Employee[] = [
  {
    id: "emp-1",
    fullName: "איתי כהן",
    phone: "050-1234567",
    avatarColor: "#c97a3d",
    role: "בעלים",
    serviceIds: ["srv-1", "srv-2", "srv-3", "srv-5", "srv-6"],
    commissionPercent: 100,
    workHours: fullWeek("09:00", "20:00"),
    rating: 4.9,
    monthlyRevenue: 18400,
    monthlyCustomers: 96,
    cancellationRate: 4,
    onVacation: false,
  },
  {
    id: "emp-2",
    fullName: "דניאל לוי",
    phone: "052-2345678",
    avatarColor: "#d9a84e",
    role: "מנהל",
    serviceIds: ["srv-1", "srv-2", "srv-4", "srv-7", "srv-8"],
    commissionPercent: 45,
    workHours: fullWeek("10:00", "19:00"),
    rating: 4.8,
    monthlyRevenue: 15200,
    monthlyCustomers: 81,
    cancellationRate: 6,
    onVacation: false,
  },
  {
    id: "emp-3",
    fullName: "נועה שמש",
    phone: "054-3456789",
    avatarColor: "#6fa37a",
    role: "עובד",
    serviceIds: ["srv-9", "srv-10", "srv-11", "srv-12"],
    commissionPercent: 40,
    workHours: fullWeek("09:30", "18:30"),
    rating: 5.0,
    monthlyRevenue: 12950,
    monthlyCustomers: 54,
    cancellationRate: 2,
    onVacation: false,
  },
  {
    id: "emp-4",
    fullName: "רותם אזולאי",
    phone: "053-4567890",
    avatarColor: "#6b8fa3",
    role: "קופה בלבד",
    serviceIds: [],
    commissionPercent: 0,
    workHours: fullWeek("09:00", "17:00"),
    rating: 4.7,
    monthlyRevenue: 0,
    monthlyCustomers: 0,
    cancellationRate: 0,
    onVacation: true,
  },
];

/* ---------- שירותים ---------- */

export const services: Service[] = [
  { id: "srv-1", name: "תספורת קלאסית", category: "תספורת גברים", durationMinutes: 30, price: 80, employeeIds: ["emp-1", "emp-2"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-2", name: "תספורת + זקן", category: "תספורת גברים", durationMinutes: 45, price: 120, employeeIds: ["emp-1", "emp-2"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-3", name: "עיצוב זקן", category: "זקן", durationMinutes: 20, price: 60, employeeIds: ["emp-1"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-4", name: "תספורת ילדים", category: "ילדים", durationMinutes: 25, price: 65, employeeIds: ["emp-2"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-5", name: "צבע שורש", category: "צבע", durationMinutes: 60, price: 180, employeeIds: ["emp-1"], requiresDeposit: true, depositAmount: 50, multiStage: true, active: true },
  { id: "srv-6", name: "צבע מלא", category: "צבע", durationMinutes: 90, price: 260, employeeIds: ["emp-1"], requiresDeposit: true, depositAmount: 80, multiStage: true, active: true },
  { id: "srv-7", name: "גוונים (היילייטס)", category: "גוונים", durationMinutes: 120, price: 380, employeeIds: ["emp-2"], requiresDeposit: true, depositAmount: 100, multiStage: true, active: true },
  { id: "srv-8", name: "בלאיאז'", category: "גוונים", durationMinutes: 150, price: 450, employeeIds: ["emp-2"], requiresDeposit: true, depositAmount: 120, multiStage: true, active: true },
  { id: "srv-9", name: "החלקת קראטין", category: "החלקה", durationMinutes: 180, price: 550, employeeIds: ["emp-3"], requiresDeposit: true, depositAmount: 150, multiStage: true, active: true },
  { id: "srv-10", name: "טיפול קרטין שיקומי", category: "טיפולים", durationMinutes: 60, price: 220, employeeIds: ["emp-3"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-11", name: "פן ועיצוב", category: "תספורת נשים", durationMinutes: 40, price: 110, employeeIds: ["emp-3"], requiresDeposit: false, multiStage: false, active: true },
  { id: "srv-12", name: "חבילת כלה — תסרוקת + איפור", category: "חבילות", durationMinutes: 120, price: 650, employeeIds: ["emp-3"], requiresDeposit: true, depositAmount: 200, multiStage: true, active: true },
];

/* ---------- לקוחות ---------- */

export const customers: Customer[] = [
  {
    id: "cus-1", fullName: "יובל ברק", phone: "050-7711234", birthDate: "1990-07-12", gender: "זכר",
    avatarColor: "#c97a3d", status: "VIP", lastVisit: daysAgo(3), visitCount: 34, totalSpent: 4820,
    notes: "אוהב לדבר על כדורגל, מעדיף שקט בתחילת התור.", preferredEmployeeId: "emp-1",
    preferredHaircut: "פייד נמוך", preferredDrink: "קפה שחור", openDebt: 0,
    activePackage: "מנוי VIP חודשי", chemistryHistory: [], createdAt: daysAgo(700),
  },
  {
    id: "cus-2", fullName: "מאיה גולן", phone: "052-8822345", birthDate: "1995-03-02", gender: "נקבה",
    avatarColor: "#d9a84e", status: "VIP", lastVisit: daysAgo(10), visitCount: 21, totalSpent: 6340,
    notes: "רגישה לאמוניה — להשתמש בצבע ללא אמוניה בלבד.", preferredEmployeeId: "emp-2",
    allergies: "אמוניה", openDebt: 0, chemistryHistory: [
      { id: "chem-1", date: daysAgo(45), formula: "7.1 + 7.0 (1:1)", oxidationPercent: 6, waitMinutes: 35, notes: "תוצאה מעולה, לחזור על אותה נוסחה" },
      { id: "chem-2", date: daysAgo(90), formula: "7.0 + 8.1 (2:1)", oxidationPercent: 9, waitMinutes: 40 },
    ], createdAt: daysAgo(500),
  },
  {
    id: "cus-3", fullName: "עומר שפירא", phone: "054-9933456", gender: "זכר",
    avatarColor: "#6fa37a", status: "רגיל", lastVisit: daysAgo(20), visitCount: 8, totalSpent: 960,
    preferredEmployeeId: "emp-1", openDebt: 0, chemistryHistory: [], createdAt: daysAgo(300),
  },
  {
    id: "cus-4", fullName: "שירה אדרי", phone: "053-1044567", birthDate: "1988-12-30", gender: "נקבה",
    avatarColor: "#6b8fa3", status: "בסיכון נטישה", lastVisit: daysAgo(95), visitCount: 14, totalSpent: 3100,
    notes: "ביקרה בעבר כל חודש, נעלמה — כדאי לשלוח מבצע חזרה.", openDebt: 0,
    chemistryHistory: [], createdAt: daysAgo(600),
  },
  {
    id: "cus-5", fullName: "טל פרידמן", phone: "050-2155678", gender: "זכר",
    avatarColor: "#c2564f", status: "רגיל", lastVisit: daysAgo(2), visitCount: 5, totalSpent: 540,
    openDebt: 120, preferredEmployeeId: "emp-2", chemistryHistory: [], createdAt: daysAgo(120),
  },
  {
    id: "cus-6", fullName: "נטע כץ", phone: "052-3266789", birthDate: "2001-01-15", gender: "נקבה",
    avatarColor: "#e0935a", status: "חדש", lastVisit: daysAgo(1), visitCount: 1, totalSpent: 110,
    openDebt: 0, chemistryHistory: [], createdAt: daysAgo(1),
  },
  {
    id: "cus-7", fullName: "אורי בן־דוד", phone: "054-4377890", gender: "זכר",
    avatarColor: "#8a8070", status: "רגיל", lastVisit: daysAgo(15), visitCount: 11, totalSpent: 1340,
    preferredEmployeeId: "emp-1", openDebt: 0, chemistryHistory: [], createdAt: daysAgo(400),
  },
  {
    id: "cus-8", fullName: "ליה מזרחי", phone: "053-5488901", birthDate: "1993-09-21", gender: "נקבה",
    avatarColor: "#c97a3d", status: "VIP", lastVisit: daysAgo(7), visitCount: 28, totalSpent: 7250,
    notes: "מתכננת חתונה — חבילת כלה בעוד חודשיים.", preferredEmployeeId: "emp-3", openDebt: 0,
    activePackage: "חבילת כלה — מקדמה שולמה", chemistryHistory: [
      { id: "chem-3", date: daysAgo(60), formula: "9.0 בלאיאז' + טונר אפרפר", oxidationPercent: 8, waitMinutes: 45 },
    ], createdAt: daysAgo(800),
  },
];

/* ---------- תורים (15, מפוזרים סביב היום) ---------- */

export const appointments: Appointment[] = [
  { id: "apt-1", customerId: "cus-1", employeeId: "emp-1", serviceIds: ["srv-2"], start: todayAt(9, 0), end: todayAt(9, 45), status: "הסתיים" },
  { id: "apt-2", customerId: "cus-3", employeeId: "emp-1", serviceIds: ["srv-1"], start: todayAt(10, 0), end: todayAt(10, 30), status: "הסתיים" },
  { id: "apt-3", customerId: "cus-2", employeeId: "emp-2", serviceIds: ["srv-7"], start: todayAt(10, 30), end: todayAt(12, 30), status: "הגיע" },
  { id: "apt-4", customerId: "cus-7", employeeId: "emp-1", serviceIds: ["srv-3"], start: todayAt(11, 0), end: todayAt(11, 20), status: "אושר" },
  { id: "apt-5", customerId: "cus-8", employeeId: "emp-3", serviceIds: ["srv-11"], start: todayAt(12, 0), end: todayAt(12, 40), status: "אושר" },
  { id: "apt-6", customerId: "cus-5", employeeId: "emp-2", serviceIds: ["srv-1"], start: todayAt(13, 0), end: todayAt(13, 30), status: "ממתין" },
  { id: "apt-7", customerId: "cus-6", employeeId: "emp-1", serviceIds: ["srv-1"], start: todayAt(14, 0), end: todayAt(14, 30), status: "אושר" },
  { id: "apt-8", customerId: "cus-4", employeeId: "emp-2", serviceIds: ["srv-6"], start: todayAt(15, 0), end: todayAt(16, 30), status: "ממתין" },
  { id: "apt-9", customerId: "cus-1", employeeId: "emp-1", serviceIds: ["srv-2"], start: todayAt(17, 0), end: todayAt(17, 45), status: "אושר" },
  { id: "apt-10", customerId: "cus-3", employeeId: "emp-1", serviceIds: ["srv-1"], start: todayAt(18, 0), end: todayAt(18, 30), status: "ממתין" },
  { id: "apt-11", customerId: "cus-2", employeeId: "emp-2", serviceIds: ["srv-1"], start: todayAt(9, 0, -1), end: todayAt(9, 30, -1), status: "לא הגיע" },
  { id: "apt-12", customerId: "cus-8", employeeId: "emp-3", serviceIds: ["srv-9"], start: todayAt(11, 0, -1), end: todayAt(14, 0, -1), status: "הסתיים" },
  { id: "apt-13", customerId: "cus-7", employeeId: "emp-1", serviceIds: ["srv-2"], start: todayAt(16, 0, -1), end: todayAt(16, 45, -1), status: "בוטל" },
  { id: "apt-14", customerId: "cus-5", employeeId: "emp-2", serviceIds: ["srv-1"], start: todayAt(10, 0, 1), end: todayAt(10, 30, 1), status: "אושר" },
  { id: "apt-15", customerId: "cus-1", employeeId: "emp-1", serviceIds: ["srv-3"], start: todayAt(13, 30, 1), end: todayAt(13, 50, 1), status: "ממתין" },
];

/* ---------- תשלומים ---------- */

export const payments: Payment[] = [
  { id: "pay-1", customerId: "cus-1", appointmentId: "apt-1", date: todayAt(9, 50), amount: 120, tip: 15, method: "אשראי", status: "שולם", items: [{ name: "תספורת + זקן", price: 120 }] },
  { id: "pay-2", customerId: "cus-3", appointmentId: "apt-2", date: todayAt(10, 35), amount: 80, method: "ביט", status: "שולם", items: [{ name: "תספורת קלאסית", price: 80 }] },
  { id: "pay-3", customerId: "cus-8", appointmentId: "apt-12", date: daysAgo(1), amount: 550, discount: 50, tip: 40, method: "אשראי", status: "שולם", items: [{ name: "החלקת קראטין", price: 550 }] },
  { id: "pay-4", customerId: "cus-5", date: daysAgo(2), amount: 120, method: "אחר", status: "חוב", items: [{ name: "תספורת קלאסית", price: 120 }] },
  { id: "pay-5", customerId: "cus-2", appointmentId: "apt-11", date: daysAgo(1), amount: 0, method: "מזומן", status: "חוב", items: [{ name: "דמי אי הגעה", price: 60 }] },
];

/* ---------- מלאי ---------- */

export const products: Product[] = [
  { id: "prd-1", name: "שמפו טיפולי ללא סולפט", category: "מכירה ללקוח", stock: 14, lowStockThreshold: 5, buyPrice: 32, sellPrice: 69, supplier: "קוסמטיקה פרו", purchaseDate: daysAgo(30) },
  { id: "prd-2", name: "סרום אנטי־פריז", category: "מכירה ללקוח", stock: 3, lowStockThreshold: 5, buyPrice: 28, sellPrice: 59, supplier: "קוסמטיקה פרו", purchaseDate: daysAgo(45) },
  { id: "prd-3", name: "ווקס עיצוב מאט", category: "מכירה ללקוח", stock: 22, lowStockThreshold: 8, buyPrice: 18, sellPrice: 45, supplier: "ברבר סטור", purchaseDate: daysAgo(15) },
  { id: "prd-4", name: "צבע שיער — גוון 7.0", category: "שימוש פנימי", stock: 9, lowStockThreshold: 6, buyPrice: 22, sellPrice: 0, supplier: "קולוריסט אימפורט", purchaseDate: daysAgo(20) },
  { id: "prd-5", name: "מי חמצן 6%", category: "שימוש פנימי", stock: 4, lowStockThreshold: 5, buyPrice: 14, sellPrice: 0, supplier: "קולוריסט אימפורט", purchaseDate: daysAgo(20) },
  { id: "prd-6", name: "קראטין מקצועי לטיפול", category: "שימוש פנימי", stock: 6, lowStockThreshold: 3, buyPrice: 145, sellPrice: 0, supplier: "סמוית' פרו", purchaseDate: daysAgo(60) },
  { id: "prd-7", name: "שמן זקן פרימיום", category: "מכירה ללקוח", stock: 17, lowStockThreshold: 6, buyPrice: 24, sellPrice: 55, supplier: "ברבר סטור", purchaseDate: daysAgo(10) },
  { id: "prd-8", name: "מסכת שיער שיקומית", category: "מכירה ללקוח", stock: 2, lowStockThreshold: 5, buyPrice: 35, sellPrice: 79, supplier: "קוסמטיקה פרו", purchaseDate: daysAgo(50) },
];

/* ---------- שיווק ---------- */

export const messageTemplates: MessageTemplate[] = [
  { id: "tpl-1", name: "תזכורת לתור", trigger: "24 שעות לפני התור", body: "היי {שם}! מזכירים לך תור מחר ב-{שעה} ל{שירות}. נתראה ב-THE NEXT VERSION ✂️", active: true },
  { id: "tpl-2", name: "אישור הגעה", trigger: "שעתיים לפני התור", body: "התור שלך היום ב-{שעה} מחכה לך. תוכל לאשר הגעה?", active: true },
  { id: "tpl-3", name: "תודה אחרי ביקור", trigger: "מיד אחרי תשלום", body: "תודה שביקרת אצלנו היום {שם}! נשמח לדירוג קצר 🙏", active: true },
  { id: "tpl-4", name: "בקשת ביקורת", trigger: "יום אחרי הביקור", body: "איך היה? נשמח אם תשאיר לנו ביקורת בגוגל: {לינק}", active: true },
  { id: "tpl-5", name: "לקוח שלא ביקר זמן רב", trigger: "60 יום ללא ביקור", body: "התגעגענו {שם}! מחכה לך הנחה של 15% על התור הבא.", active: true },
  { id: "tpl-6", name: "יום הולדת", trigger: "ביום ההולדת", body: "מזל טוב {שם}! 🎉 מתנה ממנו — 20% הנחה החודש.", active: true },
  { id: "tpl-7", name: "מבצע חודשי", trigger: "ידני", body: "מבצע החודש ב-THE NEXT VERSION: {פרטי מבצע}", active: false },
  { id: "tpl-8", name: "השקת שירות חדש", trigger: "ידני", body: "חדש אצלנו: {שם שירות}! קבעו תור והיו הראשונים לנסות.", active: false },
];

export const campaigns: Campaign[] = [
  { id: "camp-1", name: "חזרה לפעילות — 60+ יום", segment: "לא ביקרו 60 יום", status: "פעיל", sentCount: 34, openRate: 62 },
  { id: "camp-2", name: "מועדון VIP — הטבת קיץ", segment: "VIP", status: "פעיל", sentCount: 18, openRate: 81 },
  { id: "camp-3", name: "השקת בלאיאז' חדש", segment: "לקוחות גוונים", status: "טיוטה", sentCount: 0, openRate: 0 },
  { id: "camp-4", name: "תזכורת חוב פתוח", segment: "לקוחות עם חוב", status: "הסתיים", sentCount: 9, openRate: 100 },
];

/* ---------- דשבורד: הכנסות שבועיות ---------- */

export const weeklyRevenue: DailyStat[] = [
  { date: daysAgo(6), revenue: 2140 },
  { date: daysAgo(5), revenue: 1890 },
  { date: daysAgo(4), revenue: 2430 },
  { date: daysAgo(3), revenue: 1760 },
  { date: daysAgo(2), revenue: 2920 },
  { date: daysAgo(1), revenue: 3110 },
  { date: daysAgo(0), revenue: 1580 },
];

export const aiInsights: AiInsight[] = [
  { id: "ai-1", type: "מגמה", title: "ירידה בתורים בימי שלישי", description: "ב-4 השבועות האחרונים יש ירידה של 18% בתורים בימי שלישי. כדאי ליצור מבצע ייעודי ליום הזה." },
  { id: "ai-2", type: "הזדמנות", title: "לקוחות צבע חוזרים כל 45 יום", description: "מומלץ לשלוח תזכורת אוטומטית אחרי 35 יום ללקוחות שעשו צבע, לפני שהם פונים למתחרה." },
  { id: "ai-3", type: "הזדמנות", title: "שמן זקן נמכר טוב אחרי החלקה", description: "78% מהלקוחות שעשו טיפול החלקה רכשו גם שמן זקן. כדאי להציע זאת אוטומטית בקופה." },
  { id: "ai-4", type: "אזהרה", title: "4 לקוחות VIP בסיכון נטישה", description: "לא ביקרו מעל 60 יום למרות תדירות ביקור גבוהה בעבר. מומלץ ליצור קשר אישי." },
];
