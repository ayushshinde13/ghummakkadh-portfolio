"use client";
import React, { useState, useEffect } from "react";
import {
  IndianRupee,
  Save,
  MapPin,
  Zap,
  Clock,
  Route,
  Edit2,
  X,
  Loader2,
  Percent,
  Calculator,
  Car,
  CheckCircle2,
  Trash2,
  Plus,
  Building2,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import { api } from "@/lib/api";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"vehicles" | "cities" | "simulator">("vehicles");
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [cityOverrides, setCityOverrides] = useState<any[]>([]);

  // Selected City in City-Wise Tab
  const [selectedCityTab, setSelectedCityTab] = useState<string>("all");
  const [citySearchQuery, setCitySearchQuery] = useState("");

  // Modals state
  // 1. Edit Vehicle Global Pricing Modal
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [isSavingVehicle, setIsSavingVehicle] = useState(false);

  // 2. City Fare Rule Modal (Create or Edit City + Vehicle Override)
  const [isCityFareModalOpen, setIsCityFareModalOpen] = useState(false);
  const [editingCityFareRule, setEditingCityFareRule] = useState<any>(null); // if editing existing rule
  const [targetCityId, setTargetCityId] = useState<string>("");
  const [targetVehicleTypeId, setTargetVehicleTypeId] = useState<string>("");
  const [isSavingCityFare, setIsSavingCityFare] = useState(false);

  // 3. Add New City Modal
  const [isNewCityModalOpen, setIsNewCityModalOpen] = useState(false);
  const [isSavingCity, setIsSavingCity] = useState(false);

  // Simulator State
  const [simCityId, setSimCityId] = useState<string>("");
  const [simVehicleId, setSimVehicleId] = useState<string>("");
  const [simDistanceKm, setSimDistanceKm] = useState<number>(8.5);
  const [simDurationMins, setSimDurationMins] = useState<number>(20);

  // Fetch all pricing data
  const fetchPricingData = async () => {
    try {
      setIsLoading(true);
      const [rulesJson, vehicleJson, citiesJson] = await Promise.all([
        api.get("/admin/pricing/fare-rules"),
        api.get("/admin/pricing"),
        api.get("/admin/pricing/cities"),
      ]);

      if (rulesJson.success && Array.isArray(rulesJson.data)) {
        setCityOverrides(rulesJson.data);
      }

      if (citiesJson.success && Array.isArray(citiesJson.data)) {
        setCities(citiesJson.data);
        if (citiesJson.data.length > 0 && !simCityId) {
          setSimCityId(citiesJson.data[0].id);
        }
      }

      if (vehicleJson.success && Array.isArray(vehicleJson.data)) {
        setVehicleTypes(vehicleJson.data);
        if (vehicleJson.data.length > 0 && !simVehicleId) {
          setSimVehicleId(vehicleJson.data[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch pricing data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

  // --- HANDLER 1: Save Vehicle Global Default Pricing ---
  const handleSaveVehiclePricing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingVehicle || isSavingVehicle) return;

    const formData = new FormData(e.currentTarget);
    const baseFare = parseFloat(formData.get("baseFare") as string) || 0;
    const perKmRate = parseFloat(formData.get("perKmRate") as string) || 0;
    const perMinRate = parseFloat(formData.get("perMinRate") as string) || 0;
    const minFare = parseFloat(formData.get("minFare") as string) || 0;
    const commissionRate = parseFloat(formData.get("commissionRate") as string) || 0;
    const surgeMultiplier = parseFloat(formData.get("surgeMultiplier") as string) || 1.0;

    setIsSavingVehicle(true);
    try {
      const res = await api.put(`/admin/pricing/${editingVehicle.id}`, {
        baseFare,
        perKmRate,
        perMinRate,
        minFare,
        commissionRate,
        surgeMultiplier,
      });

      if (res.success) {
        setIsVehicleModalOpen(false);
        setEditingVehicle(null);
        await fetchPricingData();
      } else {
        alert(res.message || "Failed to update vehicle pricing.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while saving vehicle pricing.");
    } finally {
      setIsSavingVehicle(false);
    }
  };

  // --- HANDLER 2: Save City-Specific Vehicle Fare Rule ---
  const handleSaveCityFareRule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSavingCityFare) return;

    const formData = new FormData(e.currentTarget);
    const cityId = (formData.get("cityId") as string) || targetCityId || editingCityFareRule?.cityId;
    const vehicleTypeId = (formData.get("vehicleTypeId") as string) || targetVehicleTypeId || editingCityFareRule?.vehicleTypeId;
    const baseFare = parseFloat(formData.get("baseFare") as string) || 0;
    const perKmRate = parseFloat(formData.get("perKmRate") as string) || 0;
    const perMinRate = parseFloat(formData.get("perMinRate") as string) || 0;
    const minFare = parseFloat(formData.get("minFare") as string) || 0;
    const cancellationFee = parseFloat(formData.get("cancellationFee") as string) || 0;

    if (!cityId || !vehicleTypeId) {
      alert("Please select both a city and a vehicle type.");
      return;
    }

    setIsSavingCityFare(true);
    try {
      const payload = {
        cityId,
        vehicleTypeId,
        baseFare,
        perKmRate,
        perMinRate,
        minFare,
        cancellationFee,
      };

      let res;
      if (editingCityFareRule?.id) {
        res = await api.put(`/admin/pricing/fare-rules/${editingCityFareRule.id}`, payload);
      } else {
        res = await api.post("/admin/pricing/fare-rules", payload);
      }

      if (res.success) {
        setIsCityFareModalOpen(false);
        setEditingCityFareRule(null);
        await fetchPricingData();
      } else {
        alert(res.message || "Failed to save city fare rule.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while saving city fare rule.");
    } finally {
      setIsSavingCityFare(false);
    }
  };

  // --- HANDLER 3: Delete City Fare Rule Override ---
  const handleDeleteCityFareRule = async (ruleId: string) => {
    if (!confirm("Are you sure you want to remove this city override and restore platform default pricing for this vehicle?")) return;
    try {
      const res = await api.delete(`/admin/pricing/fare-rules/${ruleId}`);
      if (res.success) {
        await fetchPricingData();
      } else {
        alert(res.message || "Failed to delete city rule override.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting.");
    }
  };

  // --- HANDLER 4: Create New Operational City ---
  const handleCreateCity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSavingCity) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("cityName") as string;
    const state = formData.get("cityState") as string;

    if (!name || name.trim().length < 2) {
      alert("Please enter a valid city name.");
      return;
    }

    setIsSavingCity(true);
    try {
      const res = await api.post("/admin/pricing/cities", {
        name: name.trim(),
        state: state?.trim() || null,
      });

      if (res.success) {
        setIsNewCityModalOpen(false);
        await fetchPricingData();
      } else {
        alert(res.message || "Failed to create city.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while adding city.");
    } finally {
      setIsSavingCity(false);
    }
  };

  // Helper to open City Fare Modal
  const openCityFareModal = (cityId: string, vehicleTypeId: string, existingRule?: any) => {
    setTargetCityId(cityId);
    setTargetVehicleTypeId(vehicleTypeId);
    setEditingCityFareRule(existingRule || null);
    setIsCityFareModalOpen(true);
  };

  // Helper calculation for simulator
  const calculateSimulatedFare = () => {
    const selectedCity = cities.find((c) => c.id === simCityId);
    const selectedVehicle = vehicleTypes.find((v) => v.id === simVehicleId);
    if (!selectedVehicle) return null;

    // Check if city has an override for this vehicle
    const override = cityOverrides.find(
      (r) => r.cityId === simCityId && r.vehicleTypeId === simVehicleId
    );

    const baseFare = override ? parseFloat(override.baseFare) : parseFloat(selectedVehicle.baseFare);
    const perKm = override ? parseFloat(override.perKmRate) : parseFloat(selectedVehicle.perKmRate);
    const perMin = override ? parseFloat(override.perMinRate) : parseFloat(selectedVehicle.perMinRate || 0);
    const minFare = override ? parseFloat(override.minFare) : parseFloat(selectedVehicle.minFare || 30);
    const commissionPct = parseFloat(selectedVehicle.commissionRate ?? 15);

    const distanceCost = simDistanceKm * perKm;
    const timeCost = simDurationMins * perMin;
    const grossFare = Math.max(minFare, baseFare + distanceCost + timeCost);
    const platformCut = (grossFare * commissionPct) / 100;
    const driverTakeHome = grossFare - platformCut;

    return {
      cityName: selectedCity?.name || "Global Default",
      vehicleName: selectedVehicle.name,
      isCustomCityRule: !!override,
      baseFare,
      perKm,
      perMin,
      minFare,
      commissionPct,
      grossFare: Math.round(grossFare * 100) / 100,
      platformCut: Math.round(platformCut * 100) / 100,
      driverTakeHome: Math.round(driverTakeHome * 100) / 100,
    };
  };

  const simResult = calculateSimulatedFare();

  // Filtered Cities for City-Wise View
  const filteredCities = cities.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
      (c.state && c.state.toLowerCase().includes(citySearchQuery.toLowerCase()));
    if (selectedCityTab === "all") return matchesSearch;
    return matchesSearch && c.id === selectedCityTab;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-1">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-[var(--admin-text)]">Pricing & Fares</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">
            Vehicle & City Pricing System
          </h2>
          <p className="text-sm text-[var(--admin-muted)] mt-1">
            Customize base fares and rates per vehicle type, set city-specific standard fares, and override vehicle rates under each city.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewCityModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            <Building2 size={16} className="text-[var(--admin-primary)]" />
            + Add Operational City
          </button>
          <button
            onClick={() => fetchPricingData()}
            className="p-2.5 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] hover:bg-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4.5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider block">
              Vehicle Categories
            </span>
            <span className="text-2xl font-black text-[var(--admin-text)] mt-1 block">
              {vehicleTypes.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Car size={22} />
          </div>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4.5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider block">
              Operational Cities
            </span>
            <span className="text-2xl font-black text-[var(--admin-text)] mt-1 block">
              {cities.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <MapPin size={22} />
          </div>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4.5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider block">
              City Custom Overrides
            </span>
            <span className="text-2xl font-black text-[var(--admin-primary)] mt-1 block">
              {cityOverrides.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
            <SlidersHorizontal size={22} />
          </div>
        </div>

        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-4.5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider block">
              Platform Fee Range
            </span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              {vehicleTypes.length > 0
                ? `${Math.min(...vehicleTypes.map((v) => parseFloat(v.commissionRate || 15)))}% - ${Math.max(...vehicleTypes.map((v) => parseFloat(v.commissionRate || 15)))}%`
                : "15%"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Percent size={22} />
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex border-b border-[var(--admin-border)] gap-2">
        <button
          onClick={() => setActiveTab("vehicles")}
          className={`pb-3.5 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "vehicles"
              ? "border-[var(--admin-primary)] text-[var(--admin-primary)]"
              : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <Car size={16} />
          1. Vehicle Tier Pricing (Global Defaults)
        </button>

        <button
          onClick={() => setActiveTab("cities")}
          className={`pb-3.5 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "cities"
              ? "border-[var(--admin-primary)] text-[var(--admin-primary)]"
              : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <MapPin size={16} />
          2. City-Wise Vehicle Pricing
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`pb-3.5 px-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "simulator"
              ? "border-[var(--admin-primary)] text-[var(--admin-primary)]"
              : "border-transparent text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
          }`}
        >
          <Calculator size={16} />
          3. Live Fare Simulator
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: VEHICLE TIER PRICING (GLOBAL DEFAULT) */}
      {/* ========================================================================= */}
      {activeTab === "vehicles" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[var(--admin-text)]">
                Default Vehicle Type Rates & Commission
              </h3>
              <p className="text-xs text-[var(--admin-muted)] mt-0.5">
                These rates apply nationwide unless a city-specific fare rule override is created.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full py-16 text-center text-[var(--admin-muted)] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 mb-2 text-[var(--admin-primary)]" />
                <span>Loading vehicle pricing configurations...</span>
              </div>
            ) : vehicleTypes.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[var(--admin-muted)]">
                No vehicle types configured yet.
              </div>
            ) : (
              vehicleTypes.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-5 flex flex-col justify-between hover:border-[var(--admin-primary)]/40 transition-all shadow-sm group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[var(--admin-border)] text-[var(--admin-text)] group-hover:bg-[var(--admin-primary)]/10 group-hover:text-[var(--admin-primary)] transition-colors">
                          <Car size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--admin-text)] text-base">{v.name}</h4>
                          <span className="text-[11px] font-semibold text-[var(--admin-muted)] uppercase tracking-wider">
                            Category: {v.category}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          v.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {v.isActive ? "Active" : "Disabled"}
                      </span>
                    </div>

                    {/* Commission Badge */}
                    <div className="mt-4 p-3 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-medium text-[var(--admin-muted)]">
                          Platform Commission
                        </span>
                        <span className="text-xl font-black text-[var(--admin-primary)] block">
                          {v.commissionRate ?? 15}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-medium text-[var(--admin-muted)]">
                          Surge Cap
                        </span>
                        <span className="text-base font-bold text-amber-400 block">
                          {v.surgeMultiplier ?? 1.0}x
                        </span>
                      </div>
                    </div>

                    {/* Pricing Breakdown Grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                        <span className="text-[10px] font-medium text-[var(--admin-muted)] block">Base Fare</span>
                        <span className="font-bold text-sm text-[var(--admin-text)]">₹{v.baseFare}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                        <span className="text-[10px] font-medium text-[var(--admin-muted)] block">Per KM Rate</span>
                        <span className="font-bold text-sm text-[var(--admin-text)]">₹{v.perKmRate}/km</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                        <span className="text-[10px] font-medium text-[var(--admin-muted)] block">Per Min Rate</span>
                        <span className="font-bold text-sm text-[var(--admin-text)]">₹{v.perMinRate || 0}/min</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)]">
                        <span className="text-[10px] font-medium text-[var(--admin-muted)] block">Minimum Fare</span>
                        <span className="font-bold text-sm text-[var(--admin-text)]">₹{v.minFare || 30}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-4 pt-3 border-t border-[var(--admin-border)] flex items-center justify-between">
                    <span className="text-xs text-[var(--admin-muted)]">
                      {cityOverrides.filter((r) => r.vehicleTypeId === v.id).length} city overrides
                    </span>
                    <button
                      onClick={() => {
                        setEditingVehicle(v);
                        setIsVehicleModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--admin-primary)]/10 hover:bg-[var(--admin-primary)]/20 text-[var(--admin-primary)] text-xs font-bold border border-[var(--admin-primary)]/30 transition-colors cursor-pointer"
                    >
                      <Edit2 size={13} />
                      Customize Rates
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CITY-WISE VEHICLE PRICING (CITY HIERARCHY) */}
      {/* ========================================================================= */}
      {activeTab === "cities" && (
        <div className="space-y-6">
          {/* Filter Bar & City Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--admin-card)] p-4 rounded-xl border border-[var(--admin-border)]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
              <button
                onClick={() => setSelectedCityTab("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCityTab === "all"
                    ? "bg-[var(--admin-primary)] text-[#0A0E1A]"
                    : "bg-[var(--admin-background)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] border border-[var(--admin-border)]"
                }`}
              >
                All Cities ({cities.length})
              </button>
              {cities.map((city) => {
                const count = cityOverrides.filter((r) => r.cityId === city.id).length;
                return (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityTab(city.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedCityTab === city.id
                        ? "bg-[var(--admin-primary)] text-[#0A0E1A]"
                        : "bg-[var(--admin-background)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] border border-[var(--admin-border)]"
                    }`}
                  >
                    <span>{city.name}</span>
                    {count > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        selectedCityTab === city.id ? "bg-[#0A0E1A]/20 text-[#0A0E1A]" : "bg-white/10 text-[var(--admin-text)]"
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64 shrink-0">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" />
              <input
                type="text"
                placeholder="Search city or state..."
                value={citySearchQuery}
                onChange={(e) => setCitySearchQuery(e.target.value)}
                className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg pl-9 pr-3 text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
              />
            </div>
          </div>

          {/* City Groups List */}
          {filteredCities.length === 0 ? (
            <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-12 text-center text-[var(--admin-muted)]">
              <MapPin size={32} className="mx-auto mb-3 text-[var(--admin-muted)] opacity-50" />
              <p className="font-semibold">No operational cities found matching your filter.</p>
              <button
                onClick={() => setIsNewCityModalOpen(true)}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] text-xs font-bold"
              >
                + Add New City
              </button>
            </div>
          ) : (
            filteredCities.map((city) => {
              const cityRules = cityOverrides.filter((r) => r.cityId === city.id);

              return (
                <div
                  key={city.id}
                  className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] overflow-hidden shadow-sm"
                >
                  {/* City Header */}
                  <div className="p-5 border-b border-[var(--admin-border)] bg-[var(--admin-card)]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-[var(--admin-text)]">{city.name}</h3>
                          {city.state && (
                            <span className="text-xs px-2 py-0.5 rounded bg-[var(--admin-border)] text-[var(--admin-muted)]">
                              {city.state}
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                            Operational
                          </span>
                        </div>
                        <p className="text-xs text-[var(--admin-muted)] mt-0.5">
                          {cityRules.length} of {vehicleTypes.length} vehicle types have custom pricing overrides in {city.name}.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openCityFareModal(city.id, vehicleTypes[0]?.id || "")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold text-xs hover:bg-[#66E000] transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus size={14} />
                      + Add / Override Vehicle in {city.name}
                    </button>
                  </div>

                  {/* Vehicle Pricing Grid for this City */}
                  <div className="p-5">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {vehicleTypes.map((vehicle) => {
                        const override = cityRules.find((r) => r.vehicleTypeId === vehicle.id);
                        const isOverridden = !!override;

                        const baseFare = isOverridden ? override.baseFare : vehicle.baseFare;
                        const perKm = isOverridden ? override.perKmRate : vehicle.perKmRate;
                        const perMin = isOverridden ? override.perMinRate : (vehicle.perMinRate || 0);
                        const minFare = isOverridden ? override.minFare : (vehicle.minFare || 30);
                        const cancelFee = isOverridden ? override.cancellationFee : 0;

                        return (
                          <div
                            key={vehicle.id}
                            className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                              isOverridden
                                ? "bg-[var(--admin-background)] border-[var(--admin-primary)]/40 shadow-sm"
                                : "bg-[var(--admin-background)]/50 border-[var(--admin-border)] hover:border-white/20"
                            }`}
                          >
                            <div>
                              {/* Vehicle Badge & Status */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="font-bold text-sm text-[var(--admin-text)] flex items-center gap-1.5">
                                  <Car size={15} className={isOverridden ? "text-[var(--admin-primary)]" : "text-[var(--admin-muted)]"} />
                                  {vehicle.name}
                                </span>
                                {isOverridden ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--admin-primary)]/15 text-[var(--admin-primary)] font-bold">
                                    Custom City Rate
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium">
                                    Default Inherited
                                  </span>
                                )}
                              </div>

                              {/* Pricing Metrics */}
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2 rounded bg-[var(--admin-card)] border border-[var(--admin-border)]">
                                  <span className="text-[10px] text-[var(--admin-muted)] block">Base Fare</span>
                                  <span className="font-bold text-[var(--admin-text)]">₹{baseFare}</span>
                                </div>
                                <div className="p-2 rounded bg-[var(--admin-card)] border border-[var(--admin-border)]">
                                  <span className="text-[10px] text-[var(--admin-muted)] block">Per KM</span>
                                  <span className="font-bold text-[var(--admin-text)]">₹{perKm}/km</span>
                                </div>
                                <div className="p-2 rounded bg-[var(--admin-card)] border border-[var(--admin-border)]">
                                  <span className="text-[10px] text-[var(--admin-muted)] block">Per Min</span>
                                  <span className="font-bold text-[var(--admin-text)]">₹{perMin}/min</span>
                                </div>
                                <div className="p-2 rounded bg-[var(--admin-card)] border border-[var(--admin-border)]">
                                  <span className="text-[10px] text-[var(--admin-muted)] block">Min Fare</span>
                                  <span className="font-bold text-[var(--admin-text)]">₹{minFare}</span>
                                </div>
                              </div>

                              {isOverridden && cancelFee > 0 && (
                                <div className="mt-2 text-[11px] text-[var(--admin-muted)] flex items-center justify-between">
                                  <span>Cancel Fee:</span>
                                  <span className="font-semibold text-rose-400">₹{cancelFee}</span>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-3 border-t border-[var(--admin-border)] flex items-center justify-between gap-2">
                              {isOverridden ? (
                                <>
                                  <button
                                    onClick={() => openCityFareModal(city.id, vehicle.id, override)}
                                    className="inline-flex items-center gap-1 text-xs text-[var(--admin-primary)] hover:underline font-bold cursor-pointer"
                                  >
                                    <Edit2 size={12} />
                                    Edit Override
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCityFareRule(override.id)}
                                    className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs transition-colors cursor-pointer"
                                    title="Reset to Platform Default"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => openCityFareModal(city.id, vehicle.id)}
                                  className="w-full py-1.5 px-2 rounded bg-[var(--admin-border)] hover:bg-[var(--admin-primary)]/10 hover:text-[var(--admin-primary)] text-xs text-[var(--admin-muted)] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Plus size={12} />
                                  Customize for {city.name}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LIVE FARE SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Configuration Inputs */}
          <div className="lg:col-span-6 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-[var(--admin-text)] flex items-center gap-2">
                <Calculator size={20} className="text-[var(--admin-primary)]" />
                Live Fare & Commission Calculator
              </h3>
              <p className="text-xs text-[var(--admin-muted)] mt-1">
                Simulate exact passenger fare and driver/platform payout split for any city and vehicle combination.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                  Select Operational City
                </label>
                <select
                  value={simCityId}
                  onChange={(e) => setSimCityId(e.target.value)}
                  className="w-full h-11 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.state ? `(${c.state})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                  Select Vehicle Type
                </label>
                <select
                  value={simVehicleId}
                  onChange={(e) => setSimVehicleId(e.target.value)}
                  className="w-full h-11 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                >
                  {vehicleTypes.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                    Trip Distance (KM)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={simDistanceKm}
                    onChange={(e) => setSimDistanceKm(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                    Estimated Duration (Mins)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={simDurationMins}
                    onChange={(e) => setSimDurationMins(parseFloat(e.target.value) || 0)}
                    className="w-full h-11 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="lg:col-span-6 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider">
                  Simulation Outcome
                </span>
                {simResult?.isCustomCityRule ? (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--admin-primary)]/15 text-[var(--admin-primary)] font-bold">
                    City Custom Rate Applied
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium">
                    Platform Default Rate Applied
                  </span>
                )}
              </div>

              {simResult && (
                <div className="mt-6 space-y-4">
                  {/* Gross Fare */}
                  <div className="p-4 rounded-xl bg-[var(--admin-background)] border border-[var(--admin-border)] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-[var(--admin-muted)] block">
                        Estimated Rider Fare
                      </span>
                      <span className="text-3xl font-black text-[var(--admin-text)]">
                        ₹{simResult.grossFare}
                      </span>
                    </div>
                    <div className="text-right text-xs text-[var(--admin-muted)]">
                      <span>Base ₹{simResult.baseFare} + (₹{simResult.perKm}/km × {simDistanceKm}km)</span>
                      {simResult.perMin > 0 && (
                        <span className="block">+ (₹{simResult.perMin}/min × {simDurationMins}m)</span>
                      )}
                    </div>
                  </div>

                  {/* Payout Distribution */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[var(--admin-primary)]/10 border border-[var(--admin-primary)]/25">
                      <span className="text-xs font-bold text-[var(--admin-primary)] block">
                        Platform Cut ({simResult.commissionPct}%)
                      </span>
                      <span className="text-2xl font-black text-[var(--admin-primary)] mt-1 block">
                        ₹{simResult.platformCut}
                      </span>
                      <span className="text-[11px] text-[var(--admin-muted)] mt-1 block">
                        Retained by Ghumakkadh
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                      <span className="text-xs font-bold text-emerald-400 block">
                        Driver Net Payout ({100 - simResult.commissionPct}%)
                      </span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">
                        ₹{simResult.driverTakeHome}
                      </span>
                      <span className="text-[11px] text-[var(--admin-muted)] mt-1 block">
                        Credited to Driver Wallet
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-[var(--admin-muted)] p-3 rounded-lg bg-[var(--admin-background)] border border-[var(--admin-border)] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--admin-primary)] shrink-0" />
              <span>
                Fares comply with standard minimum fare (₹{simResult?.minFare}) and cancellation policies.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT VEHICLE GLOBAL PRICING */}
      {/* ========================================================================= */}
      {isVehicleModalOpen && editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-card)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                  <Car size={18} />
                </div>
                <h3 className="text-[var(--admin-text)] font-bold">
                  Edit {editingVehicle.name} Default Pricing
                </h3>
              </div>
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVehiclePricing}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Base Fare (₹)
                    </label>
                    <input
                      name="baseFare"
                      type="number"
                      step="any"
                      required
                      defaultValue={editingVehicle.baseFare}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Per KM Rate (₹)
                    </label>
                    <input
                      name="perKmRate"
                      type="number"
                      step="any"
                      required
                      defaultValue={editingVehicle.perKmRate}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Per Minute Rate (₹)
                    </label>
                    <input
                      name="perMinRate"
                      type="number"
                      step="any"
                      required
                      defaultValue={editingVehicle.perMinRate || 0}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Minimum Fare (₹)
                    </label>
                    <input
                      name="minFare"
                      type="number"
                      step="any"
                      required
                      defaultValue={editingVehicle.minFare || 30}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Commission Rate (%)
                    </label>
                    <input
                      name="commissionRate"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      required
                      defaultValue={editingVehicle.commissionRate ?? 15}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-primary)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Surge Cap Multiplier (x)
                    </label>
                    <input
                      name="surgeMultiplier"
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="10.0"
                      required
                      defaultValue={editingVehicle.surgeMultiplier ?? 1.0}
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-amber-400 outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingVehicle}
                  className="px-5 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold text-sm hover:bg-[#66E000] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingVehicle ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSavingVehicle ? "Saving..." : "Save Vehicle Rates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT/ADD CITY-SPECIFIC VEHICLE FARE RULE */}
      {/* ========================================================================= */}
      {isCityFareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-card)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                  <MapPin size={18} />
                </div>
                <h3 className="text-[var(--admin-text)] font-bold">
                  {editingCityFareRule ? "Edit City Fare Override" : "Create City Vehicle Fare Override"}
                </h3>
              </div>
              <button
                onClick={() => setIsCityFareModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCityFareRule}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Target City
                    </label>
                    <select
                      name="cityId"
                      value={targetCityId}
                      onChange={(e) => setTargetCityId(e.target.value)}
                      disabled={!!editingCityFareRule}
                      required
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)] disabled:opacity-60"
                    >
                      {cities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.state ? `(${c.state})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      Vehicle Type
                    </label>
                    <select
                      name="vehicleTypeId"
                      value={targetVehicleTypeId}
                      onChange={(e) => setTargetVehicleTypeId(e.target.value)}
                      disabled={!!editingCityFareRule}
                      required
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)] disabled:opacity-60"
                    >
                      {vehicleTypes.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      City Base Fare (₹)
                    </label>
                    <input
                      name="baseFare"
                      type="number"
                      step="any"
                      required
                      defaultValue={
                        editingCityFareRule?.baseFare
                          ? String(editingCityFareRule.baseFare).replace("₹", "")
                          : vehicleTypes.find((v) => v.id === targetVehicleTypeId)?.baseFare || ""
                      }
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      City Per KM Rate (₹)
                    </label>
                    <input
                      name="perKmRate"
                      type="number"
                      step="any"
                      required
                      defaultValue={
                        editingCityFareRule?.perKmRate
                          ? String(editingCityFareRule.perKmRate).replace("₹", "")
                          : vehicleTypes.find((v) => v.id === targetVehicleTypeId)?.perKmRate || ""
                      }
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      City Per Minute (₹)
                    </label>
                    <input
                      name="perMinRate"
                      type="number"
                      step="any"
                      required
                      defaultValue={
                        editingCityFareRule?.perMinRate
                          ? String(editingCityFareRule.perMinRate).replace("₹", "")
                          : vehicleTypes.find((v) => v.id === targetVehicleTypeId)?.perMinRate || 0
                      }
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                      City Minimum Fare (₹)
                    </label>
                    <input
                      name="minFare"
                      type="number"
                      step="any"
                      required
                      defaultValue={
                        editingCityFareRule?.minFare
                          ? String(editingCityFareRule.minFare).replace("₹", "")
                          : vehicleTypes.find((v) => v.id === targetVehicleTypeId)?.minFare || 30
                      }
                      className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                    Cancellation Fee (₹)
                  </label>
                  <input
                    name="cancellationFee"
                    type="number"
                    step="any"
                    required
                    defaultValue={
                      editingCityFareRule?.cancellationFee
                        ? String(editingCityFareRule.cancellationFee).replace("₹", "")
                        : "0"
                    }
                    className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm font-bold text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCityFareModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCityFare}
                  className="px-5 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold text-sm hover:bg-[#66E000] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingCityFare ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSavingCityFare ? "Saving..." : "Save City Override"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD NEW OPERATIONAL CITY */}
      {/* ========================================================================= */}
      {isNewCityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-card)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]">
                  <Building2 size={18} />
                </div>
                <h3 className="text-[var(--admin-text)] font-bold">Add Operational City</h3>
              </div>
              <button
                onClick={() => setIsNewCityModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCity}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                    City Name *
                  </label>
                  <input
                    name="cityName"
                    type="text"
                    required
                    placeholder="e.g. Bhilai, Raipur, Pune, Delhi"
                    className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--admin-muted)] uppercase mb-1.5">
                    State (Optional)
                  </label>
                  <input
                    name="cityState"
                    type="text"
                    placeholder="e.g. Chhattisgarh, Maharashtra"
                    className="w-full h-11 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-lg px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-card)] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsNewCityModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCity}
                  className="px-5 py-2 rounded-lg bg-[var(--admin-primary)] text-[#0A0E1A] font-bold text-sm hover:bg-[#66E000] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingCity ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {isSavingCity ? "Adding..." : "Add City"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
