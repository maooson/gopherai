import Link from "next/link"
import { Agent } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AgentOperations } from "@/components/agent-operations"
import { Badge } from "@/components/ui/badge"

interface AgentItemProps {
  agent: Pick<Agent, "id" | "name" | "status" | "createdAt">
}

export function AgentItem({ agent }: AgentItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid grow gap-1">
        <Link
          href={`/dashboard/agent/${agent.id}`}
          className="font-semibold hover:underline"
        >
          {agent.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(agent.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <div className="w-36 flex-none px-8 text-center">
        <Badge variant={agent.status ? "default" : "secondary"}>{agent.status ? "ACTIVE" : "INACTIVE"}</Badge>
      </div>
      <AgentOperations agent={{ id: agent.id, name: agent.name }} />
    </div>
  )
}

AgentItem.Skeleton = function AgentItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
