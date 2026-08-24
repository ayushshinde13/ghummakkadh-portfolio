import { User, Car, Package, ShieldAlert, Star } from "lucide-react";

export const mockRevenueData = [
  { date: "Jul 15", revenue: 210000 }, { date: "Jul 16", revenue: 235000 }, { date: "Jul 17", revenue: 280000 },
  { date: "Jul 18", revenue: 250000 }, { date: "Jul 19", revenue: 310000 }, { date: "Jul 20", revenue: 290000 },
  { date: "Jul 21", revenue: 330000 }, { date: "Jul 22", revenue: 345000 }, { date: "Jul 23", revenue: 320000 },
  { date: "Jul 24", revenue: 380000 }, { date: "Jul 25", revenue: 410000 }, { date: "Jul 26", revenue: 390000 },
  { date: "Jul 27", revenue: 430000 }, { date: "Jul 28", revenue: 450000 }, { date: "Jul 29", revenue: 420000 },
  { date: "Jul 30", revenue: 480000 }, { date: "Jul 31", revenue: 510000 }, { date: "Aug 1", revenue: 490000 },
  { date: "Aug 2", revenue: 530000 }, { date: "Aug 3", revenue: 560000 }, { date: "Aug 4", revenue: 540000 },
  { date: "Aug 5", revenue: 590000 }, { date: "Aug 6", revenue: 610000 }, { date: "Aug 7", revenue: 580000 },
  { date: "Aug 8", revenue: 620000 }, { date: "Aug 9", revenue: 650000 }, { date: "Aug 10", revenue: 630000 },
  { date: "Aug 11", revenue: 680000 }, { date: "Aug 12", revenue: 710000 }, { date: "Aug 13", revenue: 750000 },
];

export const mockOnboardings = [
  { id: 1, name: "Ramesh Kumar", role: "Auto Driver", city: "Raipur", verified: true },
  { id: 2, name: "Priya Sharma", role: "Customer", city: "Bhilai", verified: false },
  { id: 3, name: "Amit Verma", role: "E-Rickshaw", city: "Bilaspur", verified: true },
  { id: 4, name: "Sneha Gupta", role: "Customer", city: "Raipur", verified: false },
];

export const mockCityOverrides = [
  { id: 1, city: "Raipur", baseFare: "₹50", perKm: "₹12", surgeCap: "1.5x" },
  { id: 2, city: "Bhilai", baseFare: "₹45", perKm: "₹11", surgeCap: "1.2x" },
  { id: 3, city: "Bilaspur", baseFare: "₹40", perKm: "₹10", surgeCap: "1.2x" },
  { id: 4, city: "Korba", baseFare: "₹40", perKm: "₹10", surgeCap: "1.0x" },
];

export const mockPromotions = [
  { id: "PRM-001", code: "WELCOME50", type: "Percentage", value: "50%", limit: 1000, used: 842, validFrom: "01 Aug 2026", validTo: "31 Aug 2026", status: "Active" },
  { id: "PRM-002", code: "FLAT100", type: "Flat", value: "₹100", limit: 500, used: 124, validFrom: "10 Aug 2026", validTo: "15 Aug 2026", status: "Active" },
  { id: "PRM-003", code: "MONSOON20", type: "Percentage", value: "20%", limit: 5000, used: 5000, validFrom: "01 Jul 2026", validTo: "31 Jul 2026", status: "Expired" },
];

export const mockSafetyEvents = [
  { id: "EVT-1049", tripId: "TRP-84729", driver: "Ramesh Kumar", customer: "Priya Sharma", type: "Speeding (>80km/h)", severity: "High", time: "10 mins ago", status: "Unreviewed" },
  { id: "EVT-1048", tripId: "TRP-84720", driver: "Suresh Singh", customer: "Amit Verma", type: "Route Deviation", severity: "Medium", time: "45 mins ago", status: "Unreviewed" },
  { id: "EVT-1047", tripId: "TRP-84715", driver: "Vijay Yadav", customer: "Sneha Gupta", type: "Long Stop (>10m)", severity: "Low", time: "2 hrs ago", status: "Reviewed" },
];

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
