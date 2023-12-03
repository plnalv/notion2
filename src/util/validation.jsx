import { z } from 'zod'

export const User = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
})

export const Note = z.object({
    title: z.string().min(1),
    text: z.string().optional(),
})
