"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SessionProvider, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

  navOwner: [
    {
      title: "ภาพรวม",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "แดชบอร์ด",
          url: "/owner",
        },
      ],
    },
    {
      title: "จัดการสาขา",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "จัดการ",
          url: "/owner/branch",
        },
      ],
    },
    {
      title: "จัดการสมาชิก",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "จัดการ",
          url: "/owner/users",
        },
      ],
    },
    {
      title: "จัดการเมนู",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "ประเภทสินค้า",
          url: "/owner/category",
        },
        {
          title: "สินค้า",
          url: "/owner/products",
        },
      ],
    },
    {
      title: "จัดการโต๊ะ",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "จัดการ",
          url: "/owner/table",
        },
      ],
    },
    {
      title: "ตั้งค่า",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

  navAdmin: [
    {
      title: "ภาพรวม",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "แดชบอร์ด",
          url: "/admin",
        },
      ],
    },
    {
      title: "จัดการสมาชิก",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "จัดการ",
          url: `/admin/users`,
        },
      ],
    },
    {
      title: "จัดการเมนู",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "ประเภทสินค้า",
          url: "/admin/category",
        },
        {
          title: "สินค้า",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "จัดการโต๊ะ",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "จัดการ",
          url: "/admin/table",
        },
      ],
    },
    // {
    //   title: "ตั้งค่า",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],

  navMember: [
    // {
    //   title: "ภาพรวม",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "แดชบอร์ด",
    //       url: "/admin",
    //     },
    //   ],
    // },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

function NavChooser() {
  const { data: session } = useSession()

  const role = session?.user?.role || "member"
  const adminId = session?.user?.atb

  const router = useRouter()

  function handleTable() {
    router.push(`/shop/${session?.user.atb}`)
  }

  if (role == 'owner') {
    return (
      <>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navOwner} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </>
    )
  }

  if (role == 'admin') {
    return (
      <>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          {/* <div className="px-4">
            <Button className="w-full" variant="default" onClick={handleTable}>เปิดโต๊ะ</Button>
          </div> */}
          <NavMain items={data.navAdmin} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </>
    )
  }

  if (role == 'member') {
    return (
      <>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMember} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </>
    )
  }

  return (
    <>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  return (
    <SessionProvider>
      <Sidebar collapsible="icon" {...props}>
        <NavChooser />
      </Sidebar>
    </SessionProvider>
  )
}
