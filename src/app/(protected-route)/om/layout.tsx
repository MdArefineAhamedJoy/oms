"use client";
import Sidebar from "@/components/common/Sidebar";

export default function OmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="om" title="Operation Manager" />
      <main className="flex-1 overflow-y-auto">
        <div className="py-4 px-5">{children}</div>
      </main>
    </div>
  );
}
