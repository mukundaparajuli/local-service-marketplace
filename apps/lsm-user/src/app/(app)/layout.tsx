import Header from "@/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Header />
            {children}
        </html>
    )
}