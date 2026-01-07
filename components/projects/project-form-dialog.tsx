"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Search, X } from "lucide-react";
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
import { ImageUpload } from "@/components/ui/image-upload";

interface ProjectFormDialogProps {
    project?: Project | null;
    categories: Category[];
    tags: Tag[];
    onSubmit: (data: CreateProjectInput) => Promise<any>;
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
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined);
    const [demoUrl, setDemoUrl] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Search filters
    const [categorySearch, setCategorySearch] = useState("");
    const [tagSearch, setTagSearch] = useState("");

    const isEdit = !!project;

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setSlug(project.slug);
            setDescription(project.description || "");
            setContent(project.content || "");
            setThumbnailUrl(project.thumbnail_url || undefined);
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
            setThumbnailUrl(undefined);
            setDemoUrl("");
            setRepoUrl("");
            setIsPublished(false);
            setIsFeatured(false);
            setSelectedCategories([]);
            setSelectedTags([]);
        }
        setCategorySearch("");
        setTagSearch("");
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
                thumbnail_url: thumbnailUrl || undefined,
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

    // Filter by search
    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
    const filteredTags = tags.filter((tag) =>
        tag.name.toLowerCase().includes(tagSearch.toLowerCase())
    );

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
                        <Label>Thumbnail</Label>
                        <ImageUpload
                            value={thumbnailUrl}
                            onChange={setThumbnailUrl}
                            folder="projects"
                            placeholder="Upload project thumbnail"
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

                    {/* Categories with Search */}
                    {categories.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Categories</Label>
                                {selectedCategories.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                        {selectedCategories.length} selected
                                    </span>
                                )}
                            </div>
                            {categories.length > 5 && (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search categories..."
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                        className="pl-9 pr-9 h-8"
                                    />
                                    {categorySearch && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
                                            onClick={() => setCategorySearch("")}
                                        >
                                            <X className="size-3" />
                                        </Button>
                                    )}
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-1">
                                {filteredCategories.map((category) => (
                                    <Badge
                                        key={category.id}
                                        variant={
                                            selectedCategories.includes(category.id)
                                                ? "default"
                                                : "outline"
                                        }
                                        className="cursor-pointer transition-all hover:scale-105"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        {category.name}
                                    </Badge>
                                ))}
                                {filteredCategories.length === 0 && categorySearch && (
                                    <p className="text-xs text-muted-foreground py-2">
                                        No categories found
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tags with Search */}
                    {tags.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Tags</Label>
                                {selectedTags.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                        {selectedTags.length} selected
                                    </span>
                                )}
                            </div>

                            {/* Selected Tags */}
                            {selectedTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-2 rounded-md bg-muted/50">
                                    {tags
                                        .filter((tag) => selectedTags.includes(tag.id))
                                        .map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                variant="default"
                                                className="cursor-pointer"
                                                onClick={() => toggleTag(tag.id)}
                                            >
                                                {tag.icon_url && (
                                                    <i className={tag.icon_url} style={{ fontSize: '0.75rem', marginRight: '4px' }} />
                                                )}
                                                {tag.name}
                                                <X className="size-3 ml-1" />
                                            </Badge>
                                        ))}
                                </div>
                            )}

                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search tags... (type to find)"
                                    value={tagSearch}
                                    onChange={(e) => setTagSearch(e.target.value)}
                                    className="pl-9 pr-9 h-8"
                                />
                                {tagSearch && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
                                        onClick={() => setTagSearch("")}
                                    >
                                        <X className="size-3" />
                                    </Button>
                                )}
                            </div>

                            {/* Search Results (only show when searching) */}
                            {tagSearch && (
                                <div className="flex flex-wrap gap-2 p-2 rounded-md border">
                                    {filteredTags.slice(0, 5).map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant={
                                                selectedTags.includes(tag.id) ? "default" : "outline"
                                            }
                                            className="cursor-pointer transition-all hover:scale-105"
                                            onClick={() => toggleTag(tag.id)}
                                        >
                                            {tag.icon_url && (
                                                <i className={tag.icon_url} style={{ fontSize: '0.75rem', marginRight: '4px' }} />
                                            )}
                                            {tag.name}
                                        </Badge>
                                    ))}
                                    {filteredTags.length === 0 && (
                                        <p className="text-xs text-muted-foreground py-2 w-full text-center">
                                            No tags found
                                        </p>
                                    )}
                                    {filteredTags.length > 5 && (
                                        <p className="text-xs text-muted-foreground w-full text-center">
                                            +{filteredTags.length - 5} more results
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Hint when not searching */}
                            {!tagSearch && selectedTags.length === 0 && (
                                <p className="text-xs text-muted-foreground">
                                    Type to search from {tags.length} available tags
                                </p>
                            )}
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
