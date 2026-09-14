import {z} from "zod"

export const registerSchema = z.object({
    username: z.string().min(3, "username length should bne more than 2"),
    email: z.string().email(),
    password: z.string().min(6),
})

export type registerInput = z.infer<typeof registerSchema>