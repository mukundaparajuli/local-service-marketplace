"use client"

import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { Provider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "/dashboard/inbox",
        icon: Inbox,
    },
    {
        title: "My Booking",
        url: "/dashboard/booking",
        icon: Calendar,
    },
    {
        title: "My Services",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
    {
        title: "Provider Profile",
        url: "/provider/dashboard",
        icon: User,
    },
]

export function AppSidebar() {
    const { state, setOpen } = useSidebar();
    const pathname = usePathname();

    // Set sidebar state based on route
    useEffect(() => {
        if (pathname === "/dashboard/inbox") {
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
