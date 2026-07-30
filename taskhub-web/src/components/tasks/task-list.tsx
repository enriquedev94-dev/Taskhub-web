import { apiClient } from "@/lib/api/client";

type TaskListProps = {
  projectId: string;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

export async function TaskList({
  projectId,
}: TaskListProps) {
  const tasks = await apiClient.get<Task[]>(
    `/projects/${projectId}/tasks`
  );

  if (!tasks.length) {
    return (
      <div>
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">
            {task.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {task.description}
          </p>

          <span className="text-xs">
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
}