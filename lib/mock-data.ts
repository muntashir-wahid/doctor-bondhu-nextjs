export interface Clinic {
  id: string
  name: string
  specialty: string
  location: string
  address: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  image: string
  description: string
  workingHours: string
  services: string[]
  facilities: string[]
  doctors: Doctor[]
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  qualification: string
  experience: string
  image: string
  availability: string
  bio: string
}

export const mockClinics: Clinic[] = [
  {
    id: "1",
    name: "Sunrise Medical Center",
    specialty: "Multi-Specialty",
    location: "New York, NY",
    address: "123 Healthcare Ave, New York, NY 10001",
    phone: "(555) 123-4567",
    email: "contact@sunrisemedical.com",
    rating: 4.8,
    reviewCount: 342,
    image: "/modern-clinic-reception-with-digital-displays.jpg",
    description:
      "A comprehensive healthcare facility offering world-class medical services with state-of-the-art technology and experienced medical professionals.",
    workingHours: "Mon-Fri: 8:00 AM - 8:00 PM, Sat: 9:00 AM - 5:00 PM",
    services: ["General Medicine", "Cardiology", "Pediatrics", "Orthopedics", "Dermatology"],
    facilities: ["24/7 Emergency", "Pharmacy", "Laboratory", "Radiology", "ICU"],
    doctors: [
      {
        id: "d1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        qualification: "MD, FACC",
        experience: "15 years",
        image: "/professional-female-doctor.png",
        availability: "Mon, Wed, Fri: 9:00 AM - 5:00 PM",
        bio: "Board-certified cardiologist specializing in preventive cardiology and heart disease management.",
      },
      {
        id: "d2",
        name: "Dr. Michael Chen",
        specialty: "Pediatrician",
        qualification: "MD, FAAP",
        experience: "12 years",
        image: "/professional-male-doctor.png",
        availability: "Tue, Thu, Sat: 10:00 AM - 6:00 PM",
        bio: "Dedicated pediatrician with expertise in child development and preventive care.",
      },
    ],
  },
  {
    id: "2",
    name: "Green Valley Family Clinic",
    specialty: "Family Medicine",
    location: "Los Angeles, CA",
    address: "456 Wellness Blvd, Los Angeles, CA 90001",
    phone: "(555) 234-5678",
    email: "info@greenvalleyclinic.com",
    rating: 4.9,
    reviewCount: 528,
    image: "/doctor-using-tablet-with-patient-smiling.jpg",
    description:
      "Your trusted family healthcare partner providing personalized care for all ages in a warm and welcoming environment.",
    workingHours: "Mon-Sat: 7:00 AM - 7:00 PM, Sun: Closed",
    services: ["Family Medicine", "Preventive Care", "Chronic Disease Management", "Vaccinations", "Health Screenings"],
    facilities: ["On-site Lab", "Digital X-Ray", "Telemedicine", "Patient Portal"],
    doctors: [
      {
        id: "d3",
        name: "Dr. Emily Rodriguez",
        specialty: "Family Physician",
        qualification: "MD, ABFM",
        experience: "18 years",
        image: "/professional-female-dentist.png",
        availability: "Mon-Fri: 8:00 AM - 4:00 PM",
        bio: "Experienced family physician committed to comprehensive care for patients of all ages.",
      },
      {
        id: "d4",
        name: "Dr. James Wilson",
        specialty: "Internal Medicine",
        qualification: "MD, FACP",
        experience: "20 years",
        image: "/professional-male-doctor.png",
        availability: "Mon, Wed, Fri: 9:00 AM - 5:00 PM",
        bio: "Specialist in adult medicine with focus on complex medical conditions and preventive health.",
      },
    ],
  },
  {
    id: "3",
    name: "Coastal Dental & Wellness",
    specialty: "Dental Care",
    location: "Miami, FL",
    address: "789 Ocean Drive, Miami, FL 33139",
    phone: "(555) 345-6789",
    email: "smile@coastaldental.com",
    rating: 4.7,
    reviewCount: 215,
    image: "/healthcare-analytics-dashboard-on-computer-screen.jpg",
    description:
      "Modern dental practice offering comprehensive oral health services with the latest technology and gentle care approach.",
    workingHours: "Mon-Thu: 8:00 AM - 6:00 PM, Fri: 8:00 AM - 4:00 PM",
    services: ["General Dentistry", "Cosmetic Dentistry", "Orthodontics", "Oral Surgery", "Teeth Whitening"],
    facilities: ["Digital Imaging", "Sedation Dentistry", "Same-Day Crowns", "Emergency Care"],
    doctors: [
      {
        id: "d5",
        name: "Dr. Lisa Martinez",
        specialty: "General Dentist",
        qualification: "DDS",
        experience: "10 years",
        image: "/professional-female-dentist.png",
        availability: "Mon-Thu: 9:00 AM - 5:00 PM",
        bio: "Passionate about creating beautiful smiles and providing pain-free dental experiences.",
      },
      {
        id: "d6",
        name: "Dr. Robert Taylor",
        specialty: "Orthodontist",
        qualification: "DDS, MS",
        experience: "14 years",
        image: "/professional-male-doctor.png",
        availability: "Tue, Thu, Fri: 10:00 AM - 6:00 PM",
        bio: "Orthodontic specialist with expertise in braces and clear aligner treatments.",
      },
    ],
  },
  {
    id: "4",
    name: "Metropolitan Eye Institute",
    specialty: "Ophthalmology",
    location: "Chicago, IL",
    address: "321 Vision Street, Chicago, IL 60601",
    phone: "(555) 456-7890",
    email: "care@metropolitaneye.com",
    rating: 4.9,
    reviewCount: 412,
    image: "/modern-clinic-reception-with-digital-displays.jpg",
    description:
      "Leading eye care center providing comprehensive vision services from routine exams to advanced surgical procedures.",
    workingHours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM",
    services: ["Eye Exams", "LASIK Surgery", "Cataract Surgery", "Glaucoma Treatment", "Contact Lenses"],
    facilities: ["Advanced Diagnostics", "Surgical Suite", "Optical Shop", "Low Vision Clinic"],
    doctors: [
      {
        id: "d7",
        name: "Dr. Amanda Foster",
        specialty: "Ophthalmologist",
        qualification: "MD, FACS",
        experience: "16 years",
        image: "/professional-female-doctor.png",
        availability: "Mon, Wed, Fri: 9:00 AM - 5:00 PM",
        bio: "Expert in cataract and refractive surgery with thousands of successful procedures.",
      },
    ],
  },
  {
    id: "5",
    name: "Harmony Women's Health",
    specialty: "Women's Health",
    location: "Boston, MA",
    address: "567 Wellness Way, Boston, MA 02101",
    phone: "(555) 567-8901",
    email: "hello@harmonywomens.com",
    rating: 4.8,
    reviewCount: 389,
    image: "/doctor-using-tablet-with-patient-smiling.jpg",
    description: "Dedicated to providing compassionate, comprehensive healthcare for women at every stage of life.",
    workingHours: "Mon-Fri: 8:00 AM - 7:00 PM, Sat: 9:00 AM - 3:00 PM",
    services: ["OB/GYN", "Prenatal Care", "Mammography", "Fertility Services", "Menopause Management"],
    facilities: ["Ultrasound", "Mammography Suite", "Private Consultation Rooms", "Lactation Support"],
    doctors: [
      {
        id: "d8",
        name: "Dr. Jennifer Lee",
        specialty: "OB/GYN",
        qualification: "MD, FACOG",
        experience: "13 years",
        image: "/professional-female-dentist.png",
        availability: "Mon-Thu: 9:00 AM - 5:00 PM",
        bio: "Compassionate OB/GYN specializing in high-risk pregnancies and minimally invasive surgery.",
      },
    ],
  },
  {
    id: "6",
    name: "Peak Performance Sports Medicine",
    specialty: "Sports Medicine",
    location: "Denver, CO",
    address: "890 Athletic Ave, Denver, CO 80201",
    phone: "(555) 678-9012",
    email: "info@peakperformance.com",
    rating: 4.7,
    reviewCount: 267,
    image: "/healthcare-analytics-dashboard-on-computer-screen.jpg",
    description: "Specialized care for athletes and active individuals, helping you recover faster and perform better.",
    workingHours: "Mon-Sat: 7:00 AM - 8:00 PM, Sun: 9:00 AM - 5:00 PM",
    services: [
      "Sports Injury Treatment",
      "Physical Therapy",
      "Performance Training",
      "Concussion Management",
      "Joint Injections",
    ],
    facilities: ["Rehabilitation Gym", "Hydrotherapy Pool", "Biomechanics Lab", "Recovery Suite"],
    doctors: [
      {
        id: "d9",
        name: "Dr. Marcus Thompson",
        specialty: "Sports Medicine Physician",
        qualification: "MD, CAQSM",
        experience: "11 years",
        image: "/professional-male-doctor.png",
        availability: "Mon-Fri: 8:00 AM - 6:00 PM",
        bio: "Former team physician with expertise in treating athletic injuries and optimizing performance.",
      },
    ],
  },
]

export function getClinicById(id: string): Clinic | undefined {
  return mockClinics.find((clinic) => clinic.id === id)
}
