import { Suspense } from "react";
import { TaskList } from "@/components/tasks/task-list";
import { TaskListSkeleton } from "@/components/tasks/task-list-skeleton";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({
  params,
}: PageProps) {

  const { projectId } = await params;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Project Details
      </h1>

      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList projectId={projectId}/>
      </Suspense>

    </div>
  );
}