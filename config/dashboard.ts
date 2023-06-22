import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "https://docs.aow.me",
    }
  ],
  sidebarNav: [
    {
      title: "Agents",
      href: "/dashboard",
      icon: "agent",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
