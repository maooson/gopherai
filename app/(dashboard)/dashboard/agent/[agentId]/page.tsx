import { notFound, redirect } from "next/navigation"
import { Agent, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { AgentForm } from "@/components/agent-form"

async function getAgentForUser(agentId: Agent["id"], userId: User["id"]) {
  return await db.agent.findFirst({
    where: {
      id: agentId,
      ownerId: userId,
    },
  })
}

interface AgentFormPageProps {
  params: { agentId: string }
}

export default async function AgentFormPage({ params }: AgentFormPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const agent = await getAgentForUser(params.agentId, user.id)

  if (!agent) {
    notFound()
  }

  return (
    <AgentForm
      agent={{
        id: agent.id,
        name: agent.name,
        description: agent.description,
        status: agent.status,
      }}
    />
  )
}
