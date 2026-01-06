"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Education, CreateEducationInput } from "@/types/education";

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
import { DatePicker } from "@/components/ui/date-picker";
import { ImageUpload } from "@/components/ui/image-upload";

interface EducationFormDialogProps {
    education?: Education | null;
    onSubmit: (data: CreateEducationInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function EducationFormDialog({ education, onSubmit, trigger }: EducationFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [school, setSchool] = useState("");
    const [degree, setDegree] = useState("");
    const [field, setField] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [gpa, setGpa] = useState("");
    const [schoolUrl, setSchoolUrl] = useState("");
    const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);

    const isEdit = !!education;

    useEffect(() => {
        if (education) {
            setSchool(education.school);
            setDegree(education.degree);
            setField(education.field || "");
            setLocation(education.location || "");
            setDescription(education.description || "");
            setStartDate(education.start_date ? new Date(education.start_date) : undefined);
            setEndDate(education.end_date ? new Date(education.end_date) : undefined);
            setGpa(education.gpa || "");
            setSchoolUrl(education.school_url || "");
            setLogoUrl(education.logo_url || undefined);
        } else {
            setSchool("");
            setDegree("");
            setField("");
            setLocation("");
            setDescription("");
            setStartDate(undefined);
            setEndDate(undefined);
            setGpa("");
            setSchoolUrl("");
            setLogoUrl(undefined);
        }
    }, [education, open]);

    const handleSubmit = async () => {
        if (!school.trim() || !degree.trim() || !startDate) {
            toast.error("School, degree, and start date are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                school: school.trim(),
                degree: degree.trim(),
                field: field.trim() || undefined,
                location: location.trim() || undefined,
                description: description.trim() || undefined,
                start_date: startDate.toISOString(),
                end_date: endDate ? endDate.toISOString() : undefined,
                gpa: gpa.trim() || undefined,
                school_url: schoolUrl.trim() || undefined,
                logo_url: logoUrl || undefined,
            });
            toast.success(isEdit ? "Education updated" : "Education added", {
                description: `${degree} at ${school} has been ${isEdit ? "updated" : "added"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "add"} education`);
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
                        Add Education
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Education" : "Add Education"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update education details." : "Add a new education entry."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                        <Label>School Logo</Label>
                        <ImageUpload
                            value={logoUrl}
                            onChange={setLogoUrl}
                            folder="educations"
                            placeholder="Upload school logo"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="school">School/University *</Label>
                        <Input
                            id="school"
                            placeholder="e.g., Stanford University"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="degree">Degree *</Label>
                            <Input
                                id="degree"
                                placeholder="e.g., Bachelor's"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="field">Field of Study</Label>
                            <Input
                                id="field"
                                placeholder="e.g., Computer Science"
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g., California, USA"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gpa">GPA</Label>
                            <Input
                                id="gpa"
                                placeholder="e.g., 3.8/4.0"
                                value={gpa}
                                onChange={(e) => setGpa(e.target.value)}
                            />
                        </div>
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
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="schoolUrl">School Website</Label>
                        <Input
                            id="schoolUrl"
                            type="url"
                            placeholder="https://..."
                            value={schoolUrl}
                            onChange={(e) => setSchoolUrl(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your achievements, activities, etc..."
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
