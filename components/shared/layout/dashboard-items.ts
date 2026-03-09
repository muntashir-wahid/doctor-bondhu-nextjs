import {
  Building2,
  Calendar,
  FileText,
  Home,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface DashboardItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

const DASHBOARD_ITEMS = {
  SYSTEM: {
    SUPER_ADMIN: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/adminum",
      },
      {
        title: "Clinics",
        icon: Building2,
        href: "/adminum/clinics",
      },
    ],
  },

  CLINIC: {
    OWNER: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/clinic",
      },
      {
        title: "Doctors",
        icon: Stethoscope,
        href: "/clinic/doctors",
      },
      {
        title: "Patients",
        icon: Users,
        href: "/clinic/patients",
      },
      {
        title: "Appointments",
        icon: Calendar,
        href: "/clinic/appointments",
      },
      {
        title: "Staffs",
        icon: Users,
        href: "/clinic/staffs",
      },
    ],
    ADMIN: [],
    DOCTOR: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/clinic",
      },
      {
        title: "Patients",
        icon: Users,
        href: "/clinic/patients",
      },
      {
        title: "Appointments",
        icon: Calendar,
        href: "/clinic/appointments",
      },
      {
        title: "Prescriptions",
        icon: FileText,
        href: "/clinic/prescriptions",
      },
      // {
      //   title: "Medical Records",
      //   icon: FileText,
      //   href: "/clinic/medical-records",
      // },
    ],
    RECEPTIONIST: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/clinic",
      },
      {
        title: "Patients",
        icon: Users,
        href: "/clinic/patients",
      },
      {
        title: "Appointments",
        icon: Calendar,
        href: "/clinic/appointments",
      },
      {
        title: "Prescriptions",
        icon: FileText,
        href: "/clinic/prescriptions",
      },
    ],
  },

  USER: {
    PATIENT: [
      {
        title: "Dashboard",
        icon: Home,
        href: "/patient",
      },
      {
        title: "Appointments",
        icon: Calendar,
        href: "/patient/appointments",
      },
      {
        title: "Prescriptions",
        icon: FileText,
        href: "/patient/prescriptions",
      },
    ],
  },
};

export default DASHBOARD_ITEMS;
