"use client";

import { useState } from "react";
import { useFormikContext } from "formik";
import { Eye, EyeOff, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormValues } from "./types";

const AdminUserStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-3 w-fit mx-auto">
          <User className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Clinic Owner Account</h3>
        <p className="text-sm text-muted-foreground">
          Create an owner account who will manage this clinic
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="owner.firstName">First Name *</Label>
          <Input
            id="owner.firstName"
            name="owner.firstName"
            placeholder="Enter first name"
            value={values.owner.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.owner?.firstName && errors.owner?.firstName && (
            <p className="text-sm text-destructive">{errors.owner.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner.lastName">Last Name *</Label>
          <Input
            id="owner.lastName"
            name="owner.lastName"
            placeholder="Enter last name"
            value={values.owner.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.owner?.lastName && errors.owner?.lastName && (
            <p className="text-sm text-destructive">{errors.owner.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="owner.email">Email Address *</Label>
          <Input
            id="owner.email"
            name="owner.email"
            type="email"
            placeholder="owner@clinic.com"
            value={values.owner.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.owner?.email && errors.owner?.email && (
            <p className="text-sm text-destructive">{errors.owner.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="owner.password">Password *</Label>
          <div className="relative">
            <Input
              id="owner.password"
              name="owner.password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={values.owner.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {touched.owner?.password && errors.owner?.password && (
            <p className="text-sm text-destructive">{errors.owner.password}</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> The owner will have full access to manage this
          clinic&apos;s data, including doctors, patients, and appointments.
        </p>
      </div>
    </div>
  );
};

export default AdminUserStep;
