import { projectService } from "@/services/project.service";
import { ProjectCard } from "@/components/projects/project-card";

export default async function ProjectsPage() {
    const projects = await projectService.getProjects();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Projects
            </h1>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </div>
    )
}