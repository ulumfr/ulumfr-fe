"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

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

interface ResumeUploadDialogProps {
    isUploading: boolean;
    onUpload: (file: File, version?: string) => Promise<void>;
}

export function ResumeUploadDialog({
    isUploading,
    onUpload,
}: ResumeUploadDialogProps) {
    const [open, setOpen] = useState(false);
    const [version, setVersion] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;
        try {
            await onUpload(selectedFile, version || undefined);
            toast.success("Resume uploaded", {
                description: `${selectedFile.name} has been uploaded successfully.`,
            });
            setOpen(false);
            setSelectedFile(null);
            setVersion("");
        } catch {
            toast.error("Failed to upload resume", {
                description: "Please try again later.",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Upload className="size-4 mr-2" />
                    Upload Resume
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Resume</DialogTitle>
                    <DialogDescription>
                        Upload a new resume file. Supported formats: PDF, DOC, DOCX.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">File Resume (CV)</Label>
                        <Input
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                        />
                        {selectedFile && (
                            <p className="text-sm text-muted-foreground">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="version">Version (optional)</Label>
                        <Input
                            id="version"
                            placeholder="e.g., 1.0, 2.0"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedFile || isUploading}
                        className="cursor-pointer"
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
