export interface ServiceEntry {
  name: string;
  description: string;
}

export interface FacilityEntry {
  name: string;
  description: string;
}

export interface WorkingHourEntry {
  dayOfWeek: number;
  dayName: string;
  openTime: string;
  closeTime: string;
  enabled: boolean;
}

export interface FormValues {
  name: string;
  type: string;
  clinicBanner: string;
  address: string;
  contact: string;
  email: string;
  website: string;
  services: ServiceEntry[];
  facilities: FacilityEntry[];
  workingHours: WorkingHourEntry[];
  owner: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}
