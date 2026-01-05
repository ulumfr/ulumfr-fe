"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Project, CreateProjectInput } from "@/types/project";
import type { Category } from "@/types/category";
import type { Tag } from "@/types/tag";

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
import { Badge } from "@/components/ui/badge";

interface ProjectFormDialogProps {
    project?: Project | null;
    categories: Category[];
    tags: Tag[];
    onSubmit: (data: CreateProjectInput) => Promise<void>;
    trigger?: React.ReactNode;
}

export function ProjectFormDialog({
    project,
    categories,
    tags,
    onSubmit,
    trigger,
}: ProjectFormDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [demoUrl, setDemoUrl] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const isEdit = !!project;

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setSlug(project.slug);
            setDescription(project.description || "");
            setContent(project.content || "");
            setThumbnailUrl(project.thumbnail_url || "");
            setDemoUrl(project.demo_url || "");
            setRepoUrl(project.repo_url || "");
            setIsPublished(project.is_published);
            setIsFeatured(project.is_featured);
            setSelectedCategories(project.categories?.map((c) => c.id) || []);
            setSelectedTags(project.tags?.map((t) => t.id) || []);
        } else {
            setTitle("");
            setSlug("");
            setDescription("");
            setContent("");
            setThumbnailUrl("");
            setDemoUrl("");
            setRepoUrl("");
            setIsPublished(false);
            setIsFeatured(false);
            setSelectedCategories([]);
            setSelectedTags([]);
        }
    }, [project, open]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        if (!isEdit) {
            setSlug(generateSlug(value));
        }
    };

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleTag = (id: string) => {
        setSelectedTags((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
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
                description: description.trim() || undefined,
                content: content.trim() || undefined,
                thumbnail_url: thumbnailUrl.trim() || undefined,
                demo_url: demoUrl.trim() || undefined,
                repo_url: repoUrl.trim() || undefined,
                is_published: isPublished,
                is_featured: isFeatured,
                category_ids: selectedCategories.length > 0 ? selectedCategories : undefined,
                tag_ids: selectedTags.length > 0 ? selectedTags : undefined,
            });
            toast.success(isEdit ? "Project updated" : "Project created", {
                description: `${title} has been ${isEdit ? "updated" : "created"}.`,
            });
            setOpen(false);
        } catch {
            toast.error(`Failed to ${isEdit ? "update" : "create"} project`);
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
                        Add Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Project" : "Add Project"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update project details." : "Create a new project."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., My Awesome Project"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                placeholder="e.g., my-awesome-project"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of the project..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="Detailed content (supports markdown)..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                        <Input
                            id="thumbnailUrl"
                            type="url"
                            placeholder="https://..."
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="demoUrl">Demo URL</Label>
                            <Input
                                id="demoUrl"
                                type="url"
                                placeholder="https://..."
                                value={demoUrl}
                                onChange={(e) => setDemoUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repoUrl">Repository URL</Label>
                            <Input
                                id="repoUrl"
                                type="url"
                                placeholder="https://github.com/..."
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                            />
                        </div>
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
                    {categories.length > 0 && (
                        <div className="space-y-2">
                            <Label>Categories</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Badge
                                        key={category.id}
                                        variant={
                                            selectedCategories.includes(category.id)
                                                ? "default"
                                                : "outline"
                                        }
                                        className="cursor-pointer"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {tags.length > 0 && (
                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        variant={
                                            selectedTags.includes(tag.id) ? "default" : "outline"
                                        }
                                        className="cursor-pointer"
                                        onClick={() => toggleTag(tag.id)}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
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
