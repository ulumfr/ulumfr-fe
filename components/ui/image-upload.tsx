"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import uploadService from "@/services/upload-service";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string | undefined) => void;
    folder: string;
    accept?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function ImageUpload({
    value,
    onChange,
    folder,
    accept = "image/*",
    placeholder = "Upload image",
    className,
    disabled = false,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const url = await uploadService.uploadFile(file, folder);
            onChange(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to upload file");
            console.error("Upload error:", err);
        } finally {
            setIsUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={cn("space-y-2", className)}>
            <input
                type="file"
                ref={fileInputRef}
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled || isUploading}
            />

            {value ? (
                <div className="relative inline-block">
                    <div className="relative h-24 w-24 rounded-lg border overflow-hidden">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={handleRemove}
                        disabled={disabled || isUploading}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    className="h-24 w-full border-dashed cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled || isUploading}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{placeholder}</span>
                        </div>
                    )}
                </Button>
            )}

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
