import { DashboardHeader } from "@/components/header"
import { AgentCreateButton } from "@/components/agent-create-button"
import { AgentItem } from "@/components/agent-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Agents" text="Create and manage agents.">
        <AgentCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <AgentItem.Skeleton />
        <AgentItem.Skeleton />
        <AgentItem.Skeleton />
        <AgentItem.Skeleton />
        <AgentItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
