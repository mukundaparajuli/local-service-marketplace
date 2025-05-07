import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div suppressHydrationWarning>
            <Header />
            <div >
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarTrigger />
                    {children}
                </SidebarProvider>
            </div>
        </div>
    )
}