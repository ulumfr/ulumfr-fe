"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { About, CreateAboutInput } from "@/types/about";

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
import { ImageUpload } from "@/components/ui/image-upload";

interface AboutFormDialogProps {
    about?: About | null;
    onSubmit: (data: CreateAboutInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function AboutFormDialog({ about, onSubmit, trigger }: AboutFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [nickname, setNickname] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [coverUrl, setCoverUrl] = useState<string | undefined>(undefined);
    const [isActive, setIsActive] = useState(true);

    const isEdit = !!about;

    useEffect(() => {
        if (about) {
            setFullName(about.full_name);
            setNickname(about.nickname || "");
            setRole(about.role);
            setBio(about.bio || "");
            setLocation(about.location || "");
            setEmail(about.email || "");
            setPhone(about.phone || "");
            setAvatarUrl(about.avatar_url || undefined);
            setCoverUrl(about.cover_url || undefined);
            setIsActive(about.is_active);
        } else {
            setFullName("");
            setNickname("");
            setRole("");
            setBio("");
            setLocation("");
            setEmail("");
            setPhone("");
            setAvatarUrl(undefined);
            setCoverUrl(undefined);
            setIsActive(true);
        }
    }, [about, open]);

    const handleSubmit = async () => {
        if (!fullName.trim() || !role.trim()) {
            toast.error("Full name and role are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                full_name: fullName.trim(),
                nickname: nickname.trim() || undefined,
                role: role.trim(),
                bio: bio.trim() || undefined,
                location: location.trim() || undefined,
                email: email.trim() || undefined,
                phone: phone.trim() || undefined,
                avatar_url: avatarUrl || undefined,
                cover_url: coverUrl || undefined,
                is_active: isActive,
            });
            toast.success(isEdit ? "Profile updated" : "Profile created", {
                description: `${fullName}'s profile has been ${isEdit ? "updated" : "created"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "create"} profile`);
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
                        Add Profile
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Profile" : "Add Profile"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update profile information." : "Add new about/profile information."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <ImageUpload
                            value={coverUrl}
                            onChange={setCoverUrl}
                            folder="about"
                            placeholder="Upload cover image"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Avatar</Label>
                        <ImageUpload
                            value={avatarUrl}
                            onChange={setAvatarUrl}
                            folder="about"
                            placeholder="Upload avatar"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                                id="fullName"
                                placeholder="e.g., John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input
                                id="nickname"
                                placeholder="e.g., Johnny"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role *</Label>
                        <Input
                            id="role"
                            placeholder="e.g., Full Stack Developer"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="e.g., john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                placeholder="e.g., +62 812 3456 7890"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isActive"
                            checked={isActive}
                            onCheckedChange={(checked) => setIsActive(!!checked)}
                        />
                        <Label htmlFor="isActive" className="cursor-pointer">
                            Set as active profile
                        </Label>
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
