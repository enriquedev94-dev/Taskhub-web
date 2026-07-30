"use server"
import type { FormState } from "@/types/form";
import { createProjectSchema } from "@/schemas/project.schema";
import { revalidatePath } from "next/cache";
import { projectService } from "@/services/project.service";
import { z } from "zod";

export async function createProjectAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string

    const result = createProjectSchema.safeParse({
        name,
        description
    })

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }

    try {
        await projectService.createProject({
            name,
            description
        })
        revalidatePath("/projects");

        return {
            success: true,
            message: "Project created successfully."
        }
    } catch {
        return {
            success: false,
            message: "An error occurred while creating the project."
        }
    }
}