"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Client-side check for dummy auth cookie (middleware fails on static export)
    const hasAdminToken = document.cookie.includes("admin_token=true");
    
    if (!hasAdminToken) {
      router.push("/admin"); // Redirect to login
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Prevent rendering protected content until auth state is confirmed
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[var(--admin-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
