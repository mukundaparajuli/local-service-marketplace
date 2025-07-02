import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Trigger from "@/components/sidebar-trigger";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div suppressHydrationWarning>
            <Header />
            <div className="flex mt-30">
                <SidebarProvider>
                    <AppSidebar />
                    <Trigger />
                    {children}
                </SidebarProvider>
            </div>
        </div>
    )
}