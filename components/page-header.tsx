interface PageHeaderProps {
    title: string
    description?: string
    actions?: React.ReactNode
}

export function PageHeader({
    title,
    description,
    actions,
}: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && (
                    <p className="text-muted-foreground text-sm">{description}</p>
                )}
            </div>
            {actions && <div>{actions}</div>}
        </div>
    )
}
