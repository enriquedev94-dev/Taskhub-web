import { apiClient } from "@/lib/api/client";
import { Task } from "@/types/task";

class TaskService {
    async getTasks(projectId: number) {
        return apiClient.get<Task[]>(`/projects/${projectId}/tasks`)
    }
}

export const taskService = new TaskService();