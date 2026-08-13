import type { Metadata } from "next";
import AdminShell from "./AdminShell";
import Link from "next/link";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import {
  LayoutGrid,
  ClipboardCheck,
  Users,
  MapPin,
  Package,
  IndianRupee,
  Percent,
  Wallet,
  ShieldAlert,
  Siren,
  MessageSquare,
  Ticket,
  Star,
  Settings,
  Search,
  Bell,
  Menu
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ghumakkadh",
  description: "Secure admin area",
};

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AdminShell>
        {children}
      </AdminShell>
    </ProtectedRoute>
  );
}
