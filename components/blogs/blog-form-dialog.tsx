"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import type { Blog, CreateBlogInput } from "@/types/blog";
import type { Tag } from "@/types/tag";
import { useTags } from "@/hooks/use-tags";

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
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BlogFormDialogProps {
    blog?: Blog | null;
    onSubmit: (data: CreateBlogInput) => Promise<any>;
    trigger?: React.ReactNode;
}

export function BlogFormDialog({ blog, onSubmit, trigger }: BlogFormDialogProps) {
    const { tags: availableTags } = useTags();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [isPublished, setIsPublished] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

    const isEdit = !!blog;

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug);
            setExcerpt(blog.excerpt || "");
            setContent(blog.content || "");
            setCoverImage(blog.cover_image || undefined);
            setIsPublished(blog.is_published);
            setIsFeatured(blog.is_featured);
            setSelectedTagIds(blog.tags?.map((t) => t.id) || []);
        } else {
            setTitle("");
            setSlug("");
            setExcerpt("");
            setContent("");
            setCoverImage(undefined);
            setIsPublished(false);
            setIsFeatured(false);
            setSelectedTagIds([]);
        }
    }, [blog, open]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!isEdit) {
            setSlug(generateSlug(value));
        }
    };

    const addTag = (tagId: string) => {
        if (!selectedTagIds.includes(tagId)) {
            setSelectedTagIds([...selectedTagIds, tagId]);
        }
    };

    const removeTag = (tagId: string) => {
        setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
    };

    const handleSubmit = async () => {
        if (!title.trim() || !slug.trim()) {
            toast.error("Title and slug are required");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit({
                title: title.trim(),
                slug: slug.trim(),
                excerpt: excerpt.trim() || undefined,
                content: content.trim() || undefined,
                cover_image: coverImage || undefined,
                is_published: isPublished,
                is_featured: isFeatured,
                tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined,
            });
            toast.success(isEdit ? "Blog updated" : "Blog created", {
                description: `"${title}" has been ${isEdit ? "updated" : "created"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "create"} blog`);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedTags = availableTags.filter((tag) => selectedTagIds.includes(tag.id));
    const unselectedTags = availableTags.filter((tag) => !selectedTagIds.includes(tag.id));

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="cursor-pointer">
                        <Plus className="size-4 mr-2" />
                        Add Blog
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Blog" : "Create Blog"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update blog post details." : "Create a new blog post."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Cover Image</Label>
                        <ImageUpload
                            value={coverImage}
                            onChange={setCoverImage}
                            folder="blogs"
                            placeholder="Upload cover image"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Getting Started with Next.js"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                placeholder="e.g., getting-started-with-nextjs"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            placeholder="A brief summary of your blog post..."
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Write your blog content here... (Markdown supported)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            className="font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Tags</Label>
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedTags.map((tag) => (
                                    <Badge key={tag.id} variant="secondary" className="gap-1">
                                        {tag.name}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag.id)}
                                            className="hover:text-destructive"
                                        >
                                            <X className="size-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                        {unselectedTags.length > 0 && (
                            <Select onValueChange={addTag}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Add a tag..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {unselectedTags.map((tag) => (
                                        <SelectItem key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isPublished"
                                checked={isPublished}
                                onCheckedChange={(checked) => setIsPublished(!!checked)}
                            />
                            <Label htmlFor="isPublished" className="cursor-pointer">
                                Published
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="isFeatured"
                                checked={isFeatured}
                                onCheckedChange={(checked) => setIsFeatured(!!checked)}
                            />
                            <Label htmlFor="isFeatured" className="cursor-pointer">
                                Featured
                            </Label>
                        </div>
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
