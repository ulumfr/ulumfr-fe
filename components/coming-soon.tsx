import { Construction } from "lucide-react"

interface ComingSoonProps {
    title: string
    description?: string
}

export function ComingSoon({ title, description }: ComingSoonProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted p-6">
                    <Construction className="size-12 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-muted-foreground max-w-md">
                    {description || "This feature is coming soon. Stay tuned for updates!"}
                </p>
            </div>
        </div>
    )
}
