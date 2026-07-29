export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        Sidebar
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b p-4">
          Header
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}