import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { DialogBoxTemplate } from "../dialog-box-template";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateService } from "../../../actions/provider/update-service";


type PricingType = "FIXED" | "HOURLY"; // Update this according to your enum if needed

type ServiceOffering = {
    id: number;
    name: string;
    description: string;
    price: number;
    pricingType: PricingType;
    duration?: number | null;
    isActive: boolean;
};

export function UpdateServiceDialog({
    previousService,
    open,
    setOpen,
    setUpdatedService,
}: {
    previousService: any;
    open: boolean;
    setOpen: (open: boolean) => void;
    setUpdatedService: (service: any) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ServiceOffering>({ ...previousService });

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

    const handleUpdateService = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name || !formData.description || !formData.pricingType || formData.price === 0) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            const updatedService = await updateService(previousService.id, {
                ...formData,
            });
            setUpdatedService(updatedService);
            toast.success("Service updated successfully!");
            setOpen(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to update service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogBoxTemplate
            open={open}
            setOpen={setOpen}
            title="Update Service"
            description="Edit the details below to update your service."
            onSubmit={handleUpdateService}
            submitButtonText={loading ? "Saving..." : "Save Service"}
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
