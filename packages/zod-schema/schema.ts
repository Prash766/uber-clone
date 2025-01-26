import z from 'zod'

export const loginSchema= z.object({
email:z.string().email("Enter Correct Email"),
password :z.string().min(6, "Enter Password min character 6"),
})

export type loginType = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
    firstName: z.string(),
    lastName:z.string(),
    email:z.string().email("Enter Correct Email"),
password :z.string().min(6, "Enter Password min character 6"),
})

export type signUpType = z.infer<typeof signUpSchema>