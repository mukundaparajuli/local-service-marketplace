"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/provider/dashboard",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "/provider/inbox",
        icon: Inbox,
    },
    {
        title: "Bookings",
        url: "/provider/bookings",
        icon: Calendar,
    },
    {
        title: "My Services",
        url: "/provider/service",
        icon: Search,
    },
    {
        title: "Settings",
        url: "/provider/settings",
        icon: Settings,
    },
]

export function AppSidebarProvider() {
    const { state, setOpen } = useSidebar();
    const pathname = usePathname();

    // Set sidebar state based on route
    React.useEffect(() => {
        if (pathname === "/provider/inbox") {
            setOpen(false);
        }
    }, [pathname, setOpen]);

    return (
        <Sidebar className="mt-28">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
