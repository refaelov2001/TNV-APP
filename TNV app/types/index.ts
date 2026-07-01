// ============================================
// THE NEXT VERSION — Core Domain Types
// טיפוסי הליבה של המערכת. מבנה זה מוכן לחיבור Supabase:
// כל id הוא string (uuid), כל תאריך הוא ISO string.
// ============================================

export type ID = string;

/* ---------- לקוחות ---------- */

export type CustomerStatus = "רגיל" | "VIP" | "חדש" | "בסיכון נטישה";
export type Gender = "זכר" | "נקבה" | "אחר";

export interface ChemistryRecord {
  id: ID;
  date: string;
  formula: string; // נוסחת צבע
  oxidationPercent: number;
  waitMinutes: number;
  notes?: string;
}

export interface Customer {
  id: ID;
  fullName: string;
  phone: string;
  birthDate?: string;
  gender: Gender;
  avatarColor: string;
  status: CustomerStatus;
  lastVisit?: string;
  visitCount: number;
  totalSpent: number;
  notes?: string;
  preferredEmployeeId?: ID;
  preferredHaircut?: string;
  preferredDrink?: string;
  allergies?: string;
  openDebt: number;
  activePackage?: string;
  chemistryHistory: ChemistryRecord[];
  createdAt: string;
}

/* ---------- עובדים ---------- */

export type EmployeeRole = "בעלים" | "מנהל" | "עובד" | "קופה בלבד";

export interface WorkHours {
  day: "ראשון" | "שני" | "שלישי" | "רביעי" | "חמישי" | "שישי" | "שבת";
  active: boolean;
  start?: string;
  end?: string;
}

export interface Employee {
  id: ID;
  fullName: string;
  phone: string;
  avatarColor: string;
  role: EmployeeRole;
  serviceIds: ID[];
  commissionPercent: number;
  workHours: WorkHours[];
  rating: number;
  monthlyRevenue: number;
  monthlyCustomers: number;
  cancellationRate: number;
  onVacation: boolean;
}

/* ---------- שירותים ---------- */

export type ServiceCategory =
  | "תספורת גברים"
  | "תספורת נשים"
  | "זקן"
  | "צבע"
  | "גוונים"
  | "החלקה"
  | "טיפולים"
  | "ילדים"
  | "חבילות";

export interface Service {
  id: ID;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  employeeIds: ID[];
  requiresDeposit: boolean;
  depositAmount?: number;
  multiStage: boolean;
  active: boolean;
}

/* ---------- תורים ---------- */

export type AppointmentStatus =
  | "ממתין"
  | "אושר"
  | "הגיע"
  | "הסתיים"
  | "בוטל"
  | "לא הגיע";

export interface AppointmentService {
  serviceId: ID;
  staged?: boolean;
}

export interface Appointment {
  id: ID;
  customerId: ID;
  employeeId: ID;
  serviceIds: ID[];
  start: string; // ISO datetime
  end: string; // ISO datetime
  status: AppointmentStatus;
  notes?: string;
  isWaitlist?: boolean;
}

/* ---------- תשלומים ---------- */

export type PaymentMethod = "מזומן" | "אשראי" | "ביט" | "פייבוקס" | "העברה" | "אחר";
export type PaymentStatus = "שולם" | "חלקי" | "חוב";

export interface Payment {
  id: ID;
  customerId: ID;
  appointmentId?: ID;
  date: string;
  amount: number;
  discount?: number;
  tip?: number;
  method: PaymentMethod;
  status: PaymentStatus;
  items: { name: string; price: number }[];
}

/* ---------- מלאי ---------- */

export type ProductCategory = "מכירה ללקוח" | "שימוש פנימי";

export interface Product {
  id: ID;
  name: string;
  category: ProductCategory;
  stock: number;
  lowStockThreshold: number;
  buyPrice: number;
  sellPrice: number;
  supplier: string;
  purchaseDate: string;
}

/* ---------- שיווק ---------- */

export interface MessageTemplate {
  id: ID;
  name: string;
  trigger: string;
  body: string;
  active: boolean;
}

export interface Campaign {
  id: ID;
  name: string;
  segment: string;
  status: "פעיל" | "טיוטה" | "הסתיים";
  sentCount: number;
  openRate: number;
}

/* ---------- עסק / הגדרות ---------- */

export interface BusinessSettings {
  name: string;
  logoInitial: string;
  primaryColor: string;
  cancellationPolicy: string;
  requiresDeposit: boolean;
  address: string;
  phone: string;
  openHours: WorkHours[];
}

/* ---------- דשבורד ---------- */

export interface DailyStat {
  date: string;
  revenue: number;
}

export interface AiInsight {
  id: ID;
  title: string;
  description: string;
  type: "הזדמנות" | "אזהרה" | "מגמה";
}
