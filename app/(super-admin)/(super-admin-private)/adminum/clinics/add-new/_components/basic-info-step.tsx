"use client";

import { useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "./types";

const CLINIC_TYPES = [
  "General",
  "Multi-Specialty",
  "Family Medicine",
  "Dental Care",
  "Ophthalmology",
  "Women's Health",
  "Sports Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Mental Health",
  "Other",
];

const BasicInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<FormValues>();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Clinic Name *</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter clinic name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Clinic Type *</Label>
          <Select
            value={values.type}
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select clinic type" />
            </SelectTrigger>
            <SelectContent>
              {CLINIC_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.type && errors.type && (
            <p className="text-sm text-destructive">{errors.type}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="clinicBanner">Clinic Banner URL *</Label>
        <Input
          id="clinicBanner"
          name="clinicBanner"
          placeholder="https://example.com/banner.jpg"
          value={values.clinicBanner}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.clinicBanner && errors.clinicBanner && (
          <p className="text-sm text-destructive">{errors.clinicBanner}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          name="website"
          placeholder="https://www.example.com"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.website && errors.website && (
          <p className="text-sm text-destructive">{errors.website}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
