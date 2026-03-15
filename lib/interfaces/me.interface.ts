export type ClinicUserRole =
  | "OWNER"
  | "DOCTOR"
  | "PATIENT"
  | "RECEPTIONIST"
  | "ADMIN";

export interface IMe {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  clinicUid?: string;
  clinicUserUid?: string;
  role?: ClinicUserRole;
}
