"use client"

import * as React from "react"
import {
  Award,
  Briefcase,
  FileText,
  FolderKanban,
  FolderOpen,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Mail,
  Newspaper,
  Settings,
  Tags,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarLogo } from "@/components/sidebar-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "About",
      url: "/dashboard/about",
      icon: User,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderKanban,
      items: [
        {
          title: "All Projects",
          url: "/dashboard/projects",
          icon: FolderOpen,
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
          icon: Layers,
        },
        {
          title: "Tags",
          url: "/dashboard/tags",
          icon: Tags,
        },
      ],
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: Newspaper,
    },
    {
      title: "Career",
      url: "/dashboard/careers",
      icon: Briefcase,
      items: [
        {
          title: "Work Experience",
          url: "/dashboard/careers",
          icon: Briefcase,
        },
        {
          title: "Education",
          url: "/dashboard/educations",
          icon: GraduationCap,
        },
        {
          title: "Certificates",
          url: "/dashboard/certificates",
          icon: Award,
        },
      ],
    },
    {
      title: "Resume",
      url: "/dashboard/resumes",
      icon: FileText,
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: Mail,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
