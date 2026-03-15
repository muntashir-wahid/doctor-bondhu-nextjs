"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import { superAdminLogin } from "@/lib/actions/auth-actions";
import { toast } from "sonner";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Initial form values
const initialValues = {
  email: "",
  password: "",
};

interface LoginFormValues {
  email: string;
  password: string;
}

const AdminLoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: LoginFormValues, { resetForm }) => {
      const result = await superAdminLogin(values.email, values.password);
      console.log("Login result:", result);

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
                placeholder="super@admin.com"
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

          {/* <div className="flex items-center justify-end text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div> */}

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
      </CardContent>
    </Card>
  );
};

export default AdminLoginForm;
