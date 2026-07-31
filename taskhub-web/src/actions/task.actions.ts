"use server"
import type { FormState } from "@/types/form";
import { createTaskSchema } from "@/schemas/task.schema";
import { taskService } from "@/services/task.service";
import { revalidatePath } from "next/cache";

export async function createTaskAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const projectId = formData.get("projectId") as string;

    const result = createTaskSchema.safeParse({
        title,
        description,
        projectId
    })

    if(!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }

    try{
        await taskService.createTask({
            title,
            description,
            projectId
        })
        revalidatePath(`/projects/${projectId}`);
        
        return {
            success: true,
            message: "Task created successfully."
        }
    }catch{
        return {
            success: false,
            message: "An error occurred while creating the task."
        }
    }
}