"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, KeyRound, Loader2 } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] Email/Password login attempted:", { email, password })
    setIsLoading(false)
    // In a real app, this would redirect to the dashboard
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] OTP sent to:", email)
    setOtpSent(true)
    setIsLoading(false)
  }

  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] OTP login attempted:", { email, otp })
    setIsLoading(false)
    // In a real app, this would redirect to the dashboard
  }

  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Choose your preferred login method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Email & Password</TabsTrigger>
            <TabsTrigger value="otp">Email & OTP</TabsTrigger>
          </TabsList>

          {/* Email & Password Tab */}
          <TabsContent value="password">
            <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-password">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email-password"
                    type="email"
                    placeholder="doctor@clinic.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* Email & OTP Tab */}
          <TabsContent value="otp">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-otp">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email-otp"
                      type="email"
                      placeholder="doctor@clinic.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">We'll send a one-time password to your email</p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOTPLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-display">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email-display" type="email" value={email} className="pl-10" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      className="pl-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Check your email for the OTP code</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setOtpSent(false)
                      setOtp("")
                    }}
                  >
                    Change Email
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Login"
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="link"
                  className="w-full text-sm"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact your clinic administrator
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
