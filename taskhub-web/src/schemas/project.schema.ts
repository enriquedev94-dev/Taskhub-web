import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "The project name must be at least 3 characters.")
        .max(100, "The project name cannot exceed 100 characters."),
    description: z
        .string()
        .trim()
        .max(255, "The description cannot exceed 255 characters.")
        .optional(),
})