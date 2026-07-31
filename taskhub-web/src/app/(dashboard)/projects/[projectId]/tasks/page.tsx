import { Suspense } from "react";
import { TaskList } from "@/components/tasks/task-list";
import { TaskListSkeleton } from "@/components/tasks/task-list-skeleton";
import { CreateTaskButton } from "@/components/tasks/create-task-button";
import { TaskSearch } from "@/components/tasks/task-search";
import { TaskStatusFilter } from "@/components/tasks/task-status-filter";
import { Pagination } from "@/components/tasks/pagination";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    search?: string
    status?: string
    page?: string
  }>;
};

export default async function ProjectPage({
  params,
  searchParams,
}: PageProps) {

  const { projectId } = await params;
  const { search, status, page } = await searchParams;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Project Details
      </h1>
      <CreateTaskButton projectId={projectId} />
      <TaskSearch />
      <TaskStatusFilter/>
      <Pagination currentPage={Number(page ?? 1)} />
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList projectId={projectId} search={search} status={status} page={Number(page ?? 1)} />
      </Suspense>

    </div>
  );
}