import { apiClient } from "@/lib/api/client";
import { Task } from "@/types/task";

export interface CreateTaskRequest {
    title: string;
    description?: string;
    projectId: string;
}
class TaskService {
    async getTasks(projectId: number) {
        return apiClient.get<Task[]>(`/projects/${projectId}/tasks`)
    }

    async createTask(task: CreateTaskRequest){
        return apiClient.post<Task>(`/projects/${task.projectId}/tasks`, task);
    }
}

export const taskService = new TaskService();