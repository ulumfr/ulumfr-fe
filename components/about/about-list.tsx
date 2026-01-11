"use client";

import { toast } from "sonner";
import { Pencil, Trash2, User, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import Image from "next/image";
import type { About, CreateAboutInput, UpdateAboutInput } from "@/types/about";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AboutFormDialog } from "./about-form-dialog";

interface AboutListProps {
    aboutList: About[];
    isLoading: boolean;
    onCreate: (data: CreateAboutInput) => Promise<any>;
    onUpdate: (id: string, data: UpdateAboutInput) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function AboutList({
    aboutList,
    isLoading,
    onCreate,
    onUpdate,
    onDelete,
}: AboutListProps) {
    const handleDelete = async (about: About) => {
        try {
            await onDelete(about.id);
            toast.success("Profile deleted", {
                description: `${about.full_name}'s profile has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete profile");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading profiles...</div>
            </div>
        );
    }

    if (aboutList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <User className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No profile yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Add your first about/profile information.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {aboutList.map((about) => (
                <Card key={about.id} className="overflow-hidden">
                    {about.cover_url && (
                        <div className="relative h-32 w-full">
                            <Image
                                src={about.cover_url}
                                alt="Cover"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-muted p-1 overflow-hidden">
                                {about.avatar_url ? (
                                    <Image
                                        src={about.avatar_url}
                                        alt={`${about.full_name} avatar`}
                                        width={48}
                                        height={48}
                                        className="size-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="size-12 p-2 text-muted-foreground" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">{about.full_name}</CardTitle>
                                    {about.nickname && (
                                        <span className="text-muted-foreground text-sm">
                                            ({about.nickname})
                                        </span>
                                    )}
                                    {about.is_active && (
                                        <Badge variant="default" className="text-xs">
                                            <CheckCircle className="size-3 mr-1" />
                                            Active
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription>{about.role}</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <AboutFormDialog
                                about={about}
                                onSubmit={(data) => onUpdate(about.id, data)}
                                trigger={
                                    <Button variant="ghost" size="icon" className="cursor-pointer">
                                        <Pencil className="size-4" />
                                    </Button>
                                }
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-destructive hover:text-destructive"
                                onClick={() => handleDelete(about)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                            {about.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    {about.location}
                                </span>
                            )}
                            {about.email && (
                                <span className="flex items-center gap-1">
                                    <Mail className="size-3" />
                                    {about.email}
                                </span>
                            )}
                            {about.phone && (
                                <span className="flex items-center gap-1">
                                    <Phone className="size-3" />
                                    {about.phone}
                                </span>
                            )}
                        </div>
                        {about.bio && (
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
                                {about.bio}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
