"use client";

import { useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FormValues } from "./types";

const ContactLocationStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          name="address"
          placeholder="e.g., Uttara, Sector 4, Dhaka"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>
      <Separator />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact">Phone Number *</Label>
          <Input
            id="contact"
            name="contact"
            placeholder="+880XXXXXXXXXX"
            value={values.contact}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.contact && errors.contact && (
            <p className="text-sm text-destructive">{errors.contact}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="contact@clinic.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLocationStep;
