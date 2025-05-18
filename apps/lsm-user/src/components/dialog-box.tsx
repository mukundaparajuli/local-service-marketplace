import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { requestBooking } from "../../actions/request-booking";
import { toast } from "sonner";
import { DialogBoxTemplate } from "./dialog-box-template";

export function RequestBookingDialog({ open, setOpen, providerProfileId, serviceId }: { open: boolean, setOpen: (open: boolean) => void, providerProfileId: number, serviceId: number }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        scheduledDate: "",
        scheduledEndTime: "",
        location: "",
        notes: "",
        totalCost: 0,
        providerProfileId: providerProfileId,
        serviceId: serviceId,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleBooking = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!formData.scheduledDate || !formData.scheduledEndTime || !formData.location || formData.totalCost === 0) {
            toast.error("Please fill in all fields.")
            setLoading(false)
            return
        }
        try {
            const bookingInfo = {
                scheduledDate: new Date(formData.scheduledDate),
                scheduledEndTime: new Date(formData.scheduledEndTime),
                location: formData.location,
                notes: formData.notes,
                totalCost: formData.totalCost,
                serviceId: formData.serviceId,
                providerProfileId: formData.providerProfileId,
            };
            await requestBooking(bookingInfo);
            toast.success("Booking request registered successfully!");
            setOpen(false);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false)
        }

        console.log("Booking request sent:", formData);
    };

    return (

        <DialogBoxTemplate
            open={open}
            setOpen={setOpen}
            title="Update Service"
            description="Fill in the details to request a booking. Click save when you're done."
            onSubmit={handleBooking}
            submitButtonText="Save Booking"
        >
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scheduledDate" className="text-right">
                        Date
                    </Label>
                    <Input
                        id="scheduledDate"
                        type="datetime-local"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scheduledEndTime" className="text-right">
                        End Time
                    </Label>
                    <Input
                        id="scheduledEndTime"
                        type="datetime-local"
                        value={formData.scheduledEndTime}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                        Location
                    </Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalCost" className="text-right">
                        Total Cost
                    </Label>
                    <Input
                        id="totalCost"
                        type="number"
                        step="0.01"
                        value={formData.totalCost}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                        Notes
                    </Label>
                    <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="col-span-3"
                    />
                </div>
            </div>
        </DialogBoxTemplate>
    );
}