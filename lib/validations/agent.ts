import * as z from "zod"

export const agentPatchSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255).optional(),
  status: z.boolean().default(false),
})
