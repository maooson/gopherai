import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const agentCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const agents = await db.agent.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
      },
      where: {
        ownerId: user.id,
      },
    })

    return new Response(JSON.stringify(agents))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = agentCreateSchema.parse(json)

    const agent = await db.agent.create({
      data: {
        name: body.name,
        description: body.description,
        status: false,
        ownerId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(agent))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
