export interface ClinicItem {
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
}

export const STATUS_STYLES: Record<ClinicItem["status"], string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
};
