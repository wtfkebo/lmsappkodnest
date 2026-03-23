"use client";
import Sidebar from '../../components/Sidebar';
import KodBotSidebar from '../../components/KodBotSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-foreground relative z-10 w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
        {children}
      </div>
      <KodBotSidebar />
    </div>
  );
}
