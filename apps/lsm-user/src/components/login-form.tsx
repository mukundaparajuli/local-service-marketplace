"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "../../contexts/auth-context"


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [identifier, setidentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!identifier || !password) {
      toast.error("Please fill in all fields.")
      setLoading(false)
      return
    }

    try {
      const loginResponse = await login({ identifier, password })
      console.log("loginResponse", loginResponse);
      toast.success("Logged in successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your identifier and password below to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="identifier">identifier</Label>
              <Input
                id="identifier"
                type="identifier"
                placeholder="user@gmail.com"
                required
                value={identifier}
                onChange={(e) => setidentifier(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto text-sm hover:underline underline-offset-4"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn("google")}
                disabled={loading}
              >
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
