import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Search,
    MapPin,
    Star,
    Shield,
    Clock,
    MessageCircle,
    CreditCard,
    Users,
    Calendar,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Menu,
    ArrowRight,
    Quote,
    Wrench,
    Home,
    Car,
    Scissors,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import image from "@/assets/landingpage-image.png"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <Link className="flex items-center justify-center" href="/">
                    <div className="bg-emerald-600 p-2 rounded-lg mr-3">
                        <Wrench className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">Local Service Marketplace</span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-6">
                    <Link
                        className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                        href="#how-it-works"
                    >
                        How It Works
                    </Link>
                    <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" href="#features">
                        Features
                    </Link>
                    <Link
                        className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                        href="#testimonials"
                    >
                        Reviews
                    </Link>
                    <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors" href="#contact">
                        Contact
                    </Link>
                </nav>
                <div className="ml-6 flex gap-3">
                    <Link href={"/login"}>
                        <Button variant="outline" className="text-gray-700 hover:text-emerald-600" >
                            Sign In
                        </Button>
                    </Link>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Get Started</Button>
                </div>
                <Button variant="ghost" size="icon" className="md:hidden ml-2">
                    <Menu className="h-5 w-5" />
                </Button>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
                            <div className="flex flex-col justify-center space-y-6">
                                <div className="space-y-4">
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 w-fit text-sm px-3 py-1">
                                        🇳🇵 Trusted Local Services in Nepal
                                    </Badge>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-gray-900 leading-tight">
                                        Connect with Local Service Providers
                                        <span className="text-emerald-600"> Instantly</span>
                                    </h1>
                                    <p className="max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed">
                                        Browse services, book appointments, chat with providers, and review your experience. Find trusted
                                        professionals for all your needs - from cleaning to repairs.
                                    </p>
                                </div>

                                {/* Search Bar */}
                                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="What service do you need?"
                                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8">
                                        <Search className="h-4 w-4 mr-2" />
                                        Find Services
                                    </Button>
                                </div>

                                {/* Trust Indicators */}
                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="font-medium">4.9/5 Rating</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-emerald-600" />
                                        <span>5,000+ Happy Customers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-green-600" />
                                        <span>Verified Providers</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <Image
                                        src={image}
                                        width="500"
                                        height="500"
                                        alt="Local service providers at work"
                                        className="mx-auto rounded-2xl shadow-2xl"
                                    />

                                    {/* Floating Cards */}
                                    <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                                                <Wrench className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                                                <p className="text-sm text-gray-600">Plumber • Available Now</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs text-gray-600">4.9 (127 reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                                <Home className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Maya Sharma</p>
                                                <p className="text-sm text-gray-600">House Cleaner • Online</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs text-gray-600">4.8 (89 reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works" className="w-full py-16 md:py-24 bg-gray-50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">How It Works</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Browse services, book appointments, chat with providers, and review your experience
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Services</h3>
                                <p className="text-gray-600">
                                    Search and browse through hundreds of verified local service providers in your area
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Appointments</h3>
                                <p className="text-gray-600">
                                    Choose your preferred time slot and book appointments with just a few clicks
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat & Connect</h3>
                                <p className="text-gray-600">
                                    Communicate directly with service providers through our real-time chat system
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    4
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Experience</h3>
                                <p className="text-gray-600">
                                    Rate and review your service experience to help other users make informed decisions
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section id="features" className="w-full py-16 md:py-24 bg-white">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
                                Why Choose Our Platform?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                We provide everything you need to connect with trusted local service providers
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Easy Booking */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                        <Calendar className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">Easy Booking Process</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Book appointments in seconds with our intuitive scheduling system. Choose your preferred time and
                                        date.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Secure Payments */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                                        <CreditCard className="h-6 w-6 text-violet-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">Secure Payments</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Pay safely with eSewa, Khalti, and other trusted payment methods. Your transactions are protected.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Verified Providers */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                                        <Shield className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">Verified Service Providers</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        All service providers are background-checked and verified for your safety and peace of mind.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Real-time Chat */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                                        <MessageCircle className="h-6 w-6 text-rose-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">Real-time Chat & Notifications</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Stay connected with instant messaging and get real-time updates about your bookings.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Reviews & Ratings */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                        <Star className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">User Reviews & Ratings</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Read authentic reviews and ratings from real customers to make informed decisions.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* 24/7 Support */}
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                                        <Clock className="h-6 w-6 text-cyan-600" />
                                    </div>
                                    <CardTitle className="text-gray-900">24/7 Customer Support</CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Get help whenever you need it with our round-the-clock customer support team.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Service Categories */}
                <section className="w-full py-16 md:py-24 bg-gray-50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">
                                Popular Service Categories
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find the right professional for every job</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Wrench className="h-8 w-8 text-emerald-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Home Repairs</h3>
                                <p className="text-sm text-gray-600">Plumbers, Electricians, Handymen</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Home className="h-8 w-8 text-violet-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Cleaning Services</h3>
                                <p className="text-sm text-gray-600">House Cleaning, Deep Cleaning</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Scissors className="h-8 w-8 text-amber-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Beauty & Wellness</h3>
                                <p className="text-sm text-gray-600">Salon, Spa, Massage</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Car className="h-8 w-8 text-rose-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Vehicle Services</h3>
                                <p className="text-sm text-gray-600">Car Repair, Bike Service</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className="w-full py-16 md:py-24 bg-white">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 mb-4">What Our Users Say</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Real reviews from satisfied customers across Nepal
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="border-gray-200">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        "Found an amazing plumber through this platform. The booking was so easy and the service was
                                        excellent. Highly recommend!"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Priya Thapa</p>
                                            <p className="text-sm text-gray-600">Kathmandu</p>
                                        </div>
                                        <div className="ml-auto flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        "The chat feature is fantastic! I could communicate directly with the cleaner and coordinate
                                        everything perfectly."
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Amit Shrestha</p>
                                            <p className="text-sm text-gray-600">Pokhara</p>
                                        </div>
                                        <div className="ml-auto flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        "Secure payment with eSewa made everything smooth. Great platform for finding reliable service
                                        providers!"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Sunita Rai</p>
                                            <p className="text-sm text-gray-600">Lalitpur</p>
                                        </div>
                                        <div className="ml-auto flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-teal-600">
                    <div className="container px-4 md:px-6 mx-auto text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4">
                                Ready to Find Your Perfect Service Provider?
                            </h2>
                            <p className="text-xl text-emerald-100 mb-8">
                                Join thousands of satisfied customers who trust our platform for their service needs
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
                                    Find Local Services
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3 bg-transparent"
                                >
                                    Become a Provider
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="w-full py-16 bg-gray-50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-8 md:grid-cols-4 text-center">
                            <div>
                                <div className="text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-emerald-600 mb-2">800+</div>
                                <div className="text-gray-600">Service Providers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
                                <div className="text-gray-600">Service Categories</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</div>
                                <div className="text-gray-600">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-12">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid gap-8 md:grid-cols-4">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-emerald-600 p-2 rounded-lg">
                                    <Wrench className="h-6 w-6 text-white" />
                                </div>
                                <span className="font-bold text-xl">Local Service Marketplace</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Connecting you with trusted local service providers across Nepal. Quality services at your fingertips.
                            </p>
                            <div className="flex space-x-4">
                                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Quick Links</h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="hover:text-white cursor-pointer transition-colors">How It Works</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Browse Services</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Become a Provider</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Help Center</div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Popular Services</h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="hover:text-white cursor-pointer transition-colors">Home Cleaning</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Plumbing</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Electrical Work</div>
                                <div className="hover:text-white cursor-pointer transition-colors">Beauty Services</div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Contact Us</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-4 w-4" />
                                    <span>+977-1-234-5678</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4" />
                                    <span>support@localservices.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Kathmandu, Nepal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-400">
                                &copy; {new Date().getFullYear()} Local Service Marketplace. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm text-gray-400">
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About
                                </Link>
                                <Link href="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
