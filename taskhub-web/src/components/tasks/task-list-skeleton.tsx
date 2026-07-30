export function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {[1,2,3].map((item) => (
        <div
          key={item}
          className="h-24 rounded-lg border animate-pulse"
        />
      ))}
    </div>
  );
}