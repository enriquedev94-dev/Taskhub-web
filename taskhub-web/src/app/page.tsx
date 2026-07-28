import { projectService } from '../services/project.service';

export default async function Home() {
  const projects = await projectService.getProjects();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">TaskHub</h1>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="rounded border p-4"
          >
            <h2 className="font-semibold">{project.name}</h2>

            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
