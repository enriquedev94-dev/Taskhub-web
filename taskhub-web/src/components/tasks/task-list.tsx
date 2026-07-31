import { apiClient } from "@/lib/api/client";

type TaskListProps = {
  projectId: string;
  search?: string;
  status?: string;
  page: number;
};

type PaginatedResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};
export async function TaskList({
  projectId,
  search,
  status,
  page
}: TaskListProps) {
  const tasks = await apiClient.get<PaginatedResponse<Task>>(
    `/projects/${projectId}/tasks`,
    {
      params: {
        ...(search && { search }),
        ...(status && { status }),
        page
      }
    }
  );
  console.log(1,tasks)
  if (!tasks.items.length) {
    return (
      <div>
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.items.map((task) => (
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