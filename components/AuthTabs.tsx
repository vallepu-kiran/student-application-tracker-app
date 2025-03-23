'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  
  return (
    <div className="flex rounded-full bg-gray-900/50 p-1 mb-8 max-w-md mx-auto">
      <Link href="/auth/login" className="flex-1">
        <div className={`text-center py-2 px-4 rounded-full transition-all ${
          pathname === '/auth/login' 
            ? 'bg-orange-500 text-white' 
            : 'text-gray-300 hover:text-white'
        }`}>
          Login
        </div>
      </Link>
      <Link href="/auth/signup" className="flex-1">
        <div className={`text-center py-2 px-4 rounded-full transition-all ${
          pathname === '/auth/signup' 
            ? 'bg-orange-500 text-white' 
            : 'text-gray-300 hover:text-white'
        }`}>
          Register
        </div>
      </Link>
    </div>
  );
}

