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
import { signIn } from "next-auth/react"
import { register } from "../../actions/register"
import { toast } from "sonner"
import { registerProvider } from "../../actions/provider/provider-register"

export function ProviderRegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [businessName, setBusinessName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [operatingHours, setOperatingHours] = useState("")
    const [description, setDescription] = useState("")
    const [serviceRadius, setServiceRadius] = useState("")
    const [hasPhysicalStore, setHasPhysicalStore] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const result = await registerProvider({
                firstName,
                lastName,
                businessName,
                address,
                city,
                state,
                zipCode,
                latitude,
                longitude,
                operatingHours: JSON.parse(operatingHours),
                description,
                serviceRadius,
                hasPhysicalStore,
                email,
                password,
                username
            })

            if (result.error) {
                setError(result.message)
                toast.error(result.message)
            } else {
                toast.success("Registration successful! Please log in.")
                window.location.href = "/login"
            }
        } catch (err) {
            setError("Invalid input or something went wrong. Please check your fields and try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 w-1/2", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Register as Provider</CardTitle>
                    <CardDescription>
                        Enter your business details below to register as a provider
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6">

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="businessName">Business Name</Label>
                                <Input
                                    id="businessName"
                                    type="text"
                                    required
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    type="text"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                    id="zipCode"
                                    type="text"
                                    required
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="latitude">Latitude</Label>
                                <Input
                                    id="latitude"
                                    type="text"
                                    required
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    type="text"
                                    required
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="operatingHours">Operating Hours (JSON format)</Label>
                                <textarea
                                    id="operatingHours"
                                    className="border rounded p-2"
                                    rows={4}
                                    required
                                    value={operatingHours}
                                    onChange={(e) => setOperatingHours(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Example: {"{ \"monday\": \"9AM-5PM\", \"tuesday\": \"9AM-5PM\" }"}
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    className="border rounded p-2"
                                    rows={3}
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="serviceRadius">Service Radius (in km)</Label>
                                <Input
                                    id="serviceRadius"
                                    type="text"
                                    required
                                    value={serviceRadius}
                                    onChange={(e) => setServiceRadius(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    id="hasPhysicalStore"
                                    type="checkbox"
                                    checked={hasPhysicalStore}
                                    onChange={(e) => setHasPhysicalStore(e.target.checked)}
                                />
                                <Label htmlFor="hasPhysicalStore">Has Physical Store</Label>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm">{error}</div>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Registering..." : "Register as Provider"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
