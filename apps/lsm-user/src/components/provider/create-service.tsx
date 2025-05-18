import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogBoxTemplate } from "../dialog-box-template";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createService } from "../../../actions/provider/create-service";

type PricingType = "FIXED" | "HOURLY";

type ServiceOffering = {
    name: string;
    description: string;
    price: number;
    pricingType: PricingType;
    duration?: number | null;
    isActive: boolean;
};

export function CreateServiceDialog({
    open,
    setOpen,
    onServiceCreated,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    onServiceCreated: (service: any) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ServiceOffering>({
        name: "",
        description: "",
        price: 0,
        pricingType: "FIXED",
        duration: null,
        isActive: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value, type } = e.target;
        let parsedValue: string | number | boolean = value;

        if (type === "number") parsedValue = parseFloat(value);
        if (type === "checkbox") parsedValue = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [id]: parsedValue,
        }));
    };

    const handleCreateService = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name || !formData.description || !formData.pricingType || formData.price === 0) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            const newService = await createService({ ...formData });
            onServiceCreated(newService);
            toast.success("Service created successfully!");
            setFormData({
                name: "",
                description: "",
                price: 0,
                pricingType: "FIXED",
                duration: null,
                isActive: true,
            });
            setOpen(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to create service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogBoxTemplate
            open={open}
            setOpen={setOpen}
            title="Create Service"
            description="Fill in the details below to add a new service."
            onSubmit={handleCreateService}
            submitButtonText={loading ? "Creating..." : "Create Service"}
        >
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pricingType" className="text-right">Pricing Type</Label>
                    <select
                        id="pricingType"
                        value={formData.pricingType}
                        onChange={handleChange}
                        className="col-span-3 border rounded px-2 py-1"
                    >
                        <option value="FIXED">Fixed</option>
                        <option value="HOURLY">Hourly</option>
                    </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Duration (mins)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={formData.duration || ""}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right">Active</Label>
                    <input
                        id="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
            </div>
        </DialogBoxTemplate>
    );
}
