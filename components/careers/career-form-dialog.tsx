"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Career, CreateCareerInput } from "@/types/career";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { ImageUpload } from "@/components/ui/image-upload";

interface CareerFormDialogProps {
    career?: Career | null;
    onSubmit: (data: CreateCareerInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function CareerFormDialog({ career, onSubmit, trigger }: CareerFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [isCurrent, setIsCurrent] = useState(false);
    const [companyUrl, setCompanyUrl] = useState("");
    const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

    const isEdit = !!career;

    useEffect(() => {
        if (career) {
            setCompany(career.company);
            setPosition(career.position);
            setLocation(career.location || "");
            setDescription(career.description || "");
            setStartDate(career.start_date ? new Date(career.start_date) : undefined);
            setEndDate(career.end_date ? new Date(career.end_date) : undefined);
            setIsCurrent(career.is_current);
            setCompanyUrl(career.company_url || "");
            setLogoUrl(career.logo_url || undefined);
        } else {
            setCompany("");
            setPosition("");
            setLocation("");
            setDescription("");
            setStartDate(undefined);
            setEndDate(undefined);
            setIsCurrent(false);
            setCompanyUrl("");
            setLogoUrl(undefined);
        }
    }, [career, open]);

    const handleSubmit = async () => {
        if (!company.trim() || !position.trim() || !startDate) {
            toast.error("Company, position, and start date are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                company: company.trim(),
                position: position.trim(),
                location: location.trim() || undefined,
                description: description.trim() || undefined,
                start_date: startDate.toISOString(),
                end_date: endDate ? endDate.toISOString() : undefined,
                is_current: isCurrent,
                company_url: companyUrl.trim() || undefined,
                logo_url: logoUrl || undefined,
            });
            toast.success(isEdit ? "Experience updated" : "Experience added", {
                description: `${position} at ${company} has been ${isEdit ? "updated" : "added"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "add"} experience`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="cursor-pointer">
                        <Plus className="size-4 mr-2" />
                        Add Experience
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Experience" : "Add Experience"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update work experience details." : "Add a new work experience."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <ImageUpload
                            value={logoUrl}
                            onChange={setLogoUrl}
                            folder="careers"
                            placeholder="Upload company logo"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company *</Label>
                            <Input
                                id="company"
                                placeholder="e.g., Google"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position">Position *</Label>
                            <Input
                                id="position"
                                placeholder="e.g., Software Engineer"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            placeholder="e.g., Jakarta, Indonesia"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <DatePicker
                                date={startDate}
                                onDateChange={setStartDate}
                                placeholder="Select start date"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <DatePicker
                                date={endDate}
                                onDateChange={setEndDate}
                                placeholder="Select end date"
                                disabled={isCurrent}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isCurrent"
                            checked={isCurrent}
                            onCheckedChange={(checked) => {
                                setIsCurrent(!!checked);
                                if (checked) setEndDate(undefined);
                            }}
                        />
                        <Label htmlFor="isCurrent" className="cursor-pointer">
                            I currently work here
                        </Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyUrl">Company Website</Label>
                        <Input
                            id="companyUrl"
                            type="url"
                            placeholder="https://..."
                            value={companyUrl}
                            onChange={(e) => setCompanyUrl(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your responsibilities and achievements..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="cursor-pointer"
                    >
                        {isLoading ? "Saving..." : isEdit ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
