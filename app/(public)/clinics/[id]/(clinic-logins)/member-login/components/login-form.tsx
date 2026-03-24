"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Lock, Loader2, UserCog } from "lucide-react";
import { clinicUserLogin } from "@/lib/actions/auth-actions";
import { toast } from "sonner";

export type Role = "OWNER" | "ADMIN" | "DOCTOR";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["OWNER", "ADMIN", "DOCTOR"], "Please select a valid role")
    .required("Role is required"),
});

const initialValues = {
  email: "",
  password: "",
  role: "" as Role | "",
};

export function ClinicMemberLoginForm({ clinicUid }: { clinicUid: string }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const result = await clinicUserLogin(
        values.email,
        values.password,
        values.role as Role,
        clinicUid,
      );

      if (result.data) {
        resetForm();
        toast.success("Login successful! Redirecting...");
        router.refresh();
      }

      if (result.error) {
        toast.error(result.error.message || "Login failed. Please try again.");
      }
    },
  });

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Sign in to access your clinic dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="member@clinic.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 ${
                  formik.errors.email && formik.touched.email
                    ? "border-destructive"
                    : ""
                }`}
              />
            </div>
            {formik.errors.email && formik.touched.email && (
              <p className="text-sm text-destructive">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`pl-10 ${
                  formik.errors.password && formik.touched.password
                    ? "border-destructive"
                    : ""
                }`}
              />
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-sm text-destructive">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <div className="relative">
              <UserCog className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Select
                value={formik.values.role}
                onValueChange={(value) =>
                  formik.setFieldValue("role", value as Role)
                }
              >
                <SelectTrigger
                  id="role"
                  className={`pl-10 ${
                    formik.errors.role && formik.touched.role
                      ? "border-destructive"
                      : ""
                  }`}
                  onBlur={() => formik.setFieldTouched("role", true)}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OWNER">Owner</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formik.errors.role && formik.touched.role && (
              <p className="text-sm text-destructive">{formik.errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            size="lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need assistance?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
