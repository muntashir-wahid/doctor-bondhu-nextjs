import * as Yup from "yup";

export const step1Schema = Yup.object({
  name: Yup.string().required("Clinic name is required"),
  type: Yup.string().required("Clinic type is required"),
  clinicBanner: Yup.string()
    .url("Must be a valid URL")
    .required("Clinic banner URL is required"),
  website: Yup.string()
    .transform((value) => value || undefined)
    .url("Must be a valid URL")
    .optional(),
});

export const step2Schema = Yup.object({
  address: Yup.string().required("Address is required"),
  contact: Yup.string().required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const step3Schema = Yup.object({
  services: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Service name is required"),
        description: Yup.string(),
      }),
    )
    .min(1, "At least one service is required"),
  facilities: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Facility name is required"),
        description: Yup.string(),
      }),
    )
    .min(1, "At least one facility is required"),
  workingHours: Yup.array().test(
    "at-least-one-open",
    "At least one working day must be enabled",
    (value) => value?.some((wh: any) => wh.enabled) ?? false,
  ),
});

export const step4Schema = Yup.object({
  owner: Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  }),
});
