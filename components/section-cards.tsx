import { Briefcase, FolderKanban, Layers, Tags } from "lucide-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardsProps {
  stats?: {
    totalProjects: number
    totalTags: number
    totalCategories: number
    totalCareers: number
  }
}

const cardData = [
  {
    title: "Total Projects",
    key: "totalProjects" as const,
    icon: FolderKanban,
    gradient: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-500",
  },
  {
    title: "Total Tags",
    key: "totalTags" as const,
    icon: Tags,
    gradient: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    title: "Total Categories",
    key: "totalCategories" as const,
    icon: Layers,
    gradient: "from-purple-500/10 to-purple-500/5",
    iconColor: "text-purple-500",
  },
  {
    title: "Total Careers",
    key: "totalCareers" as const,
    icon: Briefcase,
    gradient: "from-orange-500/10 to-orange-500/5",
    iconColor: "text-orange-500",
  },
]

export function SectionCards({ stats }: SectionCardsProps) {
  const data = stats || {
    totalProjects: 0,
    totalTags: 0,
    totalCategories: 0,
    totalCareers: 0,
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((card) => (
        <Card
          key={card.key}
          className={`@container/card bg-gradient-to-br ${card.gradient}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription>{card.title}</CardDescription>
            <card.icon className={`size-4 ${card.iconColor}`} />
          </CardHeader>
          <CardTitle className="px-6 pb-6 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data[card.key]}
          </CardTitle>
        </Card>
      ))}
    </div>
  )
}
