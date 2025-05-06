"use client"
import { toast } from "react-toastify";
import { getAllServices } from "../../actions/get-services"
import { useEffect, useState } from "react";
import ServiceCard from "./service-card";

export default function ServicePage() {
    const [services, setServices] = useState([])
    const getServices = async () => {
        try {
            const data = await getAllServices();
            setServices(data.services);
            console.log("services = ", data);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || 'Something went wrong. Please try again later.');
        }
    }

    useEffect(() => {
        getServices();
    }, [])
    return (
        <div className="w-full h-full p-20 flex justify-center items-center">
            {Array.isArray(services) && services.map((service: any, index) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" key={index}>
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                    <ServiceCard service={service} />
                </div>
            ))
            }
        </div >
    )
}