import { apiClient } from '../lib/api/client';
import { Project } from '../types/project';
class ProjectService {
    async getProjects(){
        return apiClient.get<Project[]>('/projects');
    }
}

export const projectService = new ProjectService();