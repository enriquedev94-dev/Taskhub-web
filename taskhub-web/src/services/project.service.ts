import { apiClient } from '../lib/api/client';
import { Project } from '../types/project';

export interface CreateProjectRequest {
    name: string;
    description: string;
}
class ProjectService {
    async getProjects(){
        return apiClient.get<Project[]>('/projects');
    }

    async createProject(project: CreateProjectRequest){
        return apiClient.post<Project>('/projects', project);
    }
}

export const projectService = new ProjectService();