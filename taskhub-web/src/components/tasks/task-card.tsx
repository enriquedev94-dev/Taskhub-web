import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-sm text-muted-foreground">
          {task.description}
        </p>
      )}

      <span className="text-sm">
        Status: {task.status}
      </span>
    </div>
  );
}