"use client";

import { toast } from "sonner";
import {
    Pencil,
    Trash2,
    FolderOpen,
    ExternalLink,
    Github,
    Eye,
    EyeOff,
    Star,
} from "lucide-react";
import type { Project, CreateProjectInput, UpdateProjectInput } from "@/types/project";
import type { Category } from "@/types/category";
import type { Tag } from "@/types/tag";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectFormDialog } from "./project-form-dialog";

interface ProjectListProps {
    projects: Project[];
    categories: Category[];
    tags: Tag[];
    isLoading: boolean;
    onUpdate: (id: string, data: UpdateProjectInput) => Promise<any>;
    onDelete: (id: string) => Promise<any>;
}

export function ProjectList({
    projects,
    categories,
    tags,
    isLoading,
    onUpdate,
    onDelete,
}: ProjectListProps) {
    const handleDelete = async (project: Project) => {
        try {
            await onDelete(project.id);
            toast.success("Project deleted", {
                description: `${project.title} has been deleted.`,
            });
        } catch {
            toast.error("Failed to delete project");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading projects...</div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <FolderOpen className="size-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No projects yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                    Create your first project to showcase your work.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <Card key={project.id} className="flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-base truncate">
                                        {project.title}
                                    </CardTitle>
                                    {project.is_featured && (
                                        <Star className="size-4 text-yellow-500 fill-yellow-500" />
                                    )}
                                </div>
                                <CardDescription className="truncate">
                                    /{project.slug}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-1">
                                <ProjectFormDialog
                                    project={project}
                                    categories={categories}
                                    tags={tags}
                                    onSubmit={(data) => onUpdate(project.id, data)}
                                    trigger={
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 cursor-pointer"
                                        >
                                            <Pencil className="size-4" />
                                        </Button>
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 cursor-pointer text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(project)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        {project.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {project.description}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-1 mb-3">
                            {project.categories?.map((cat) => (
                                <Badge key={cat.id} variant="secondary" className="text-xs">
                                    {cat.name}
                                </Badge>
                            ))}
                            {project.tags?.map((tag) => (
                                <Badge key={tag.id} variant="outline" className="text-xs">
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Badge
                                variant={project.is_published ? "default" : "secondary"}
                                className="text-xs"
                            >
                                {project.is_published ? (
                                    <>
                                        <Eye className="size-3 mr-1" />
                                        Published
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="size-3 mr-1" />
                                        Draft
                                    </>
                                )}
                            </Badge>
                            {project.demo_url && (
                                <a
                                    href={project.demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    <ExternalLink className="size-4" />
                                </a>
                            )}
                            {project.repo_url && (
                                <a
                                    href={project.repo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                >
                                    <Github className="size-4" />
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
