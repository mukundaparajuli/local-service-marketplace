import ProviderPage from "@/components/providers-page";
import ServicePage from "@/components/service-page";

export default function Dashboard() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-4xl">
                <ServicePage />
                <ProviderPage />
            </h1>
        </div>
    )
}