import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { agentPatchSchema } from "@/lib/validations/agent"

const routeContextSchema = z.object({
  params: z.object({
    agentId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this agent.
    if (!(await verifyCurrentUserHasAccessToAgent(params.agentId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the agent.
    await db.agent.delete({
      where: {
        id: params.agentId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this agent.
    if (!(await verifyCurrentUserHasAccessToAgent(params.agentId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = agentPatchSchema.parse(json)

    // Update the agent.
    // TODO: Implement sanitization for content.
    await db.agent.update({
      where: {
        id: params.agentId,
      },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToAgent(agentId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.agent.count({
    where: {
      id: agentId,
      ownerId: session?.user.id,
    },
  })

  return count > 0
}
