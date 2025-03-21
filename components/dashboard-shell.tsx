import { UserNav } from "@/components/user-nav";
import Image from "next/image";


interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-gray-700">
        <div className="container flex h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center space-x-2">
            <Image
              src="/lit-logo.svg"
              alt="LIT Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-white font-bold text-lg md:text-xl">
              LIT School
            </span>
          </div>
          <UserNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
}
