import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent } from "react";



type DialogBoxTemplateProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: (e: FormEvent) => Promise<void>;
    submitButtonText: string;
}

export function DialogBoxTemplate({ open, setOpen, title, description, children, onSubmit, submitButtonText }: DialogBoxTemplateProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div>{title}</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button type="button" onClick={onSubmit}>
                        {submitButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}