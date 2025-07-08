import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarProvider } from "@/components/app-sidebar-provider";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div suppressHydrationWarning>
            <Header />
            <div className="flex mt-30">
                <SidebarProvider>
                    <AppSidebarProvider />
                    <SidebarTrigger />
                    {children}
                </SidebarProvider>
            </div>
        </div>
    )
}