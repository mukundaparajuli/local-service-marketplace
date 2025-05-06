import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div >
                <SidebarProvider>
                    <AppSidebar />
                    <div className="md:hidden">
                        <SidebarTrigger />
                    </div>
                    {children}
                </SidebarProvider>
            </div>
        </div>
    )
}