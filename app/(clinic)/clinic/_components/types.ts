export interface ClinicFacility {
  uid: string;
  name: string;
  description: string;
  status: string;
  clinicUid: string;
}

export interface ClinicService {
  uid: string;
  name: string;
  description: string;
  status: string;
  clinicUid: string;
}

export interface ClinicWorkingHour {
  uid: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  status: string;
  clinicUid: string;
}

export interface ClinicData {
  uid: string;
  name: string;
  slug: string;
  address: string;
  contact: string;
  email: string;
  type: string;
  clinicBanner: string;
  website: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  clinicFacilities: ClinicFacility[];
  clinicServices: ClinicService[];
  clinicWorkingHours: ClinicWorkingHour[];
}

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const STATUS_STYLES: Record<ClinicData["status"], string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
};
