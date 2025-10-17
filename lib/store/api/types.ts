// Common types for the healthcare application
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "doctor" | "nurse" | "receptionist";
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  medications?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  user: User;
  specialization: string;
  licenseNumber: string;
  experience: number;
  qualifications: string[];
  bio?: string;
  consultationFee: number;
  availableHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website?: string;
  services: string[];
  facilities: string[];
  operatingHours: {
    day: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }[];
  images: string[];
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctor: Doctor;
  clinicId: string;
  clinic: Clinic;
  appointmentDate: string;
  appointmentTime: string;
  duration: number; // in minutes
  type: "consultation" | "follow-up" | "emergency" | "checkup";
  status:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  notes?: string;
  symptoms?: string[];
  diagnosis?: string;
  prescription?: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  followUpDate?: string;
  fee: number;
  paymentStatus: "pending" | "paid" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patient: Patient;
  doctorId: string;
  doctor: Doctor;
  appointmentId?: string;
  appointment?: Appointment;
  date: string;
  type:
    | "consultation"
    | "lab-report"
    | "prescription"
    | "diagnosis"
    | "surgery"
    | "vaccination";
  title: string;
  description: string;
  findings?: string;
  diagnosis?: string;
  treatment?: string;
  prescription?: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  labTests?: {
    testName: string;
    result: string;
    normalRange: string;
    status: "normal" | "abnormal" | "critical";
  }[];
  attachments?: {
    filename: string;
    url: string;
    type: string;
  }[];
  isConfidential: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number;
  };
  message: string;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
  medicalHistory?: string[];
  allergies?: string[];
  medications?: string[];
}

export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  clinicId: string;
  appointmentDate: string;
  appointmentTime: string;
  type: "consultation" | "follow-up" | "emergency" | "checkup";
  notes?: string;
  symptoms?: string[];
}

export interface UpdateAppointmentRequest {
  appointmentDate?: string;
  appointmentTime?: string;
  status?:
    | "scheduled"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "no-show";
  notes?: string;
  diagnosis?: string;
  prescription?: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  followUpDate?: string;
}

// Query parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PatientFilters extends PaginationParams {
  search?: string;
  gender?: "male" | "female" | "other";
  ageRange?: {
    min: number;
    max: number;
  };
}

export interface AppointmentFilters extends PaginationParams {
  doctorId?: string;
  clinicId?: string;
  patientId?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: string;
}

export interface ClinicFilters extends PaginationParams {
  search?: string;
  city?: string;
  services?: string[];
  rating?: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
  };
  message?: string;
}

// Error response type
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}
