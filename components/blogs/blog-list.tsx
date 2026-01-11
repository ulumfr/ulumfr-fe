"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, FileText, Eye, EyeOff, Star, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import type { Blog, CreateBlogInput, UpdateBlogInput } from "@/types/blog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogFormDialog } from "./blog-form-dialog";

interface BlogListProps {
    blogs: Blog[];
    isLoading: boolean;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
    onPageChange: (page: number) => void;
    onCreate: (data: CreateBlogInput) => Promise<any>;
    onUpdate: (id: string, data: UpdateBlogInput) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function BlogList({
    blogs,
    isLoading,
    pagination,
    onPageChange,
    onCreate,
    onUpdate,
    onDelete,
}: BlogListProps) {
    const handleDelete = async (blog: Blog) => {
        try {
            await onDelete(blog.id);
            toast.success("Blog deleted", {
                description: `"${blog.title}" has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete blog");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading blogs...</div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No blogs yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Create your first blog post.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden flex flex-col">
                        {blog.cover_image && (
                            <div className="relative h-40 w-full">
                                <Image
                                    src={blog.cover_image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base line-clamp-2">{blog.title}</CardTitle>
                                    <CardDescription className="text-xs mt-1">
                                        /{blog.slug}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <BlogFormDialog
                                        blog={blog}
                                        onSubmit={(data) => onUpdate(blog.id, data)}
                                        trigger={
                                            <Button variant="ghost" size="icon" className="cursor-pointer size-8">
                                                <Pencil className="size-3" />
                                            </Button>
                                        }
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-pointer size-8 text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(blog)}
                                    >
                                        <Trash2 className="size-3" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1 flex flex-col">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {blog.is_published ? (
                                    <Badge variant="default" className="text-xs">
                                        <Eye className="size-3 mr-1" />
                                        Published
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="text-xs">
                                        <EyeOff className="size-3 mr-1" />
                                        Draft
                                    </Badge>
                                )}
                                {blog.is_featured && (
                                    <Badge variant="outline" className="text-xs">
                                        <Star className="size-3 mr-1" />
                                        Featured
                                    </Badge>
                                )}
                            </div>
                            {blog.excerpt && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-1">
                                    {blog.excerpt}
                                </p>
                            )}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {blog.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag.id} variant="secondary" className="text-xs">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                    {blog.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs">
                                            +{blog.tags.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                                <Calendar className="size-3" />
                                {format(new Date(blog.created_at), "MMM d, yyyy")}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={!pagination.has_prev}
                        className="cursor-pointer"
                    >
                        <ChevronLeft className="size-4" />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.total_pages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={!pagination.has_next}
                        className="cursor-pointer"
                    >
                        Next
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
