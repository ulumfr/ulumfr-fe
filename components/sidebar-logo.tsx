"use client"

import Image from "next/image"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function SidebarLogo() {
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent cursor-default"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                        <Image
                            src="/icon.png"
                            alt="Ulumfr Logo"
                            width={32}
                            height={32}
                            className="size-8"
                            draggable={false}
                        />
                    </div>
                    {!isCollapsed && (
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-lg">Ulumfr</span>
                            <span className="truncate text-xs text-muted-foreground">Dashboard Portfolio</span>
                        </div>
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
