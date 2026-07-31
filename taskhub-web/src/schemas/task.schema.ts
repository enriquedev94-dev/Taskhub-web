import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "The task title must be at least 3 characters.")
        .max(100, "The task title cannot exceed 100 characters."),
    description: z
        .string()
        .trim()
        .max(255, "The description cannot exceed 255 characters.")
        .optional(),
    projectId: z
        .string()
        .trim()
        .min(1, "The project ID is required.")
})