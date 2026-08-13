import { User, Car, Package, ShieldAlert, Star } from "lucide-react";

export const GLOBAL_MOCK_DATA = [
  // Users
  { id: "usr-001", type: "User", name: "Ramesh Kumar", sub: "Driver • Raipur", url: "/admin/users", icon: User },
  { id: "usr-002", type: "User", name: "Priya Sharma", sub: "Customer • Bhilai", url: "/admin/users", icon: User },
  { id: "usr-003", type: "User", name: "Amit Verma", sub: "Driver • Bilaspur", url: "/admin/users", icon: User },
  { id: "usr-004", type: "User", name: "Sneha Gupta", sub: "Customer • Raipur", url: "/admin/users", icon: User },
  
  // Trips
  { id: "trp-84729", type: "Trip", name: "Trip TRP-84729", sub: "Marine Drive, Raipur", url: "/admin/trips", icon: Car },
  { id: "trp-84610", type: "Trip", name: "Trip TRP-84610", sub: "Highway 43, Bhilai", url: "/admin/trips", icon: Car },
  { id: "trp-84592", type: "Trip", name: "Trip TRP-84592", sub: "City Center, Bilaspur", url: "/admin/trips", icon: Car },

  // Parcels
  { id: "pkg-1049", type: "Parcel", name: "Parcel PKG-1049", sub: "To: Anjali Rao (Raipur)", url: "/admin/parcels", icon: Package },
  { id: "pkg-1048", type: "Parcel", name: "Parcel PKG-1048", sub: "To: Vikas Jain (Bhilai)", url: "/admin/parcels", icon: Package },

  // SOS/Safety
  { id: "sos-590", type: "Safety", name: "SOS Alert SOS-590", sub: "Triggered by Priya Sharma", url: "/admin/sos", icon: ShieldAlert },
  
  // Feedback
  { id: "fdb-990", type: "Feedback", name: "Feedback FDB-990", sub: "From Priya Sharma (5 Stars)", url: "/admin/feedback", icon: Star },
];
