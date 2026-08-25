"use client";
import React, { useState, useEffect } from "react";
import { IndianRupee, Save, MapPin, Zap, Clock, Route, Edit2, X, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function PricingPage() {
  const [editingCity, setEditingCity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [cityOverrides, setCityOverrides] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  
  const [globalDefaults, setGlobalDefaults] = useState({
    baseFare: 40,
    perKmRate: 10,
    perMinRate: 1.5,
    surgeMultiplier: 1.2
  });

  const fetchPricingData = async () => {
    try {
      setIsLoading(true);
      const [rulesJson, vehicleJson, citiesJson] = await Promise.all([
        api.get("/admin/pricing/fare-rules"),
        api.get("/admin/pricing"),
        api.get("/admin/pricing/cities")
      ]);
      
      if (rulesJson.success) {
        const formatted = rulesJson.data.map((rule: any) => ({
          id: rule.id,
          city: rule.cityName,
          cityId: rule.cityId,
          vehicle: rule.vehicleTypeName,
          vehicleTypeId: rule.vehicleTypeId,
          baseFare: `₹${rule.baseFare}`,
          perKm: `₹${rule.perKmRate}`,
          perMin: `₹${rule.perMinRate}`,
          minFare: `₹${rule.minFare}`,
          cancellationFee: `₹${rule.cancellationFee}`,
          surgeCap: "N/A",
          raw: rule
        }));
        setCityOverrides(formatted);
      }
      
      if (citiesJson.success) {
        setCities(citiesJson.data);
      }

      if (vehicleJson.success) {
        setVehicleTypes(vehicleJson.data);
        if (vehicleJson.data.length > 0) {
          const firstVehicle = vehicleJson.data[0];
          setGlobalDefaults({
            baseFare: firstVehicle.baseFare,
            perKmRate: firstVehicle.perKmRate,
            perMinRate: firstVehicle.perMinRate,
            surgeMultiplier: firstVehicle.surgeMultiplier
          });
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

  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState<string>("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSaving) return;

    const formData = new FormData(e.currentTarget);
    const citySelection = formData.get("citySelection") as string;
    const vehicleTypeId = formData.get("vehicleTypeId") as string;
    const baseFare = parseFloat(formData.get("baseFare") as string);
    const perKmRate = parseFloat(formData.get("perKm") as string);
    const perMinRate = parseFloat(formData.get("perMin") as string);
    const minFare = parseFloat(formData.get("minFare") as string);
    const cancellationFee = parseFloat(formData.get("cancellationFee") as string) || 0;

    setIsSaving(true);
    try {
      let cityId = citySelection;
      
      // If adding a new operational city, create it first
      if (citySelection === "NEW") {
        const cityName = formData.get("newCityName") as string;
        const cityState = formData.get("newCityState") as string;
        
        const cityRes = await api.post("/admin/pricing/cities", {
          name: cityName,
          state: cityState || null
        });
        
        if (cityRes.success && cityRes.data) {
          cityId = cityRes.data.id;
        } else {
          throw new Error("Failed to create city in database");
        }
      }

      // Save the fare rule override
      const ruleRes = await api.post("/admin/pricing/fare-rules", {
        cityId,
        vehicleTypeId,
        baseFare,
        perKmRate,
        perMinRate,
        minFare,
        cancellationFee
      });

      if (ruleRes.success) {
        setIsModalOpen(false);
        await fetchPricingData();
      } else {
        alert("Failed to save fare rules");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const activeVehicle = vehicleTypes.find(v => v.id === selectedVehicleTypeId);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">Pricing</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">Pricing & Fare Rules</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Configure global default fares and manage city-specific overrides.
          </p>
        </div>
      </div>

      {/* Global Default Fare Cards */}
      <div>
        <h3 className="text-lg font-bold text-[var(--admin-text)] mb-4">Global Default Fares</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[var(--admin-border)]"><IndianRupee size={16} className="text-[var(--admin-muted)]" /></div>
              <span className="font-semibold text-[var(--admin-muted)]">Base Fare</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-[var(--admin-text)]">₹{globalDefaults.baseFare}</span>
              <span className="text-sm text-[var(--admin-muted)] mb-1">flat</span>
            </div>
          </div>
          
          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[var(--admin-border)]"><Route size={16} className="text-[var(--admin-muted)]" /></div>
              <span className="font-semibold text-[var(--admin-muted)]">Per KM Rate</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-[var(--admin-text)]">₹{globalDefaults.perKmRate}</span>
              <span className="text-sm text-[var(--admin-muted)] mb-1">/ km</span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-[var(--admin-border)]"><Clock size={16} className="text-[var(--admin-muted)]" /></div>
              <span className="font-semibold text-[var(--admin-muted)]">Per Minute</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-[var(--admin-text)]">₹{globalDefaults.perMinRate}</span>
              <span className="text-sm text-[var(--admin-muted)] mb-1">/ min</span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-500/10"><Zap size={16} className="text-amber-500" /></div>
              <span className="font-semibold text-[var(--admin-muted)]">Surge Multiplier</span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-amber-500">{globalDefaults.surgeMultiplier}x</span>
              <span className="text-sm text-[var(--admin-muted)] mb-1">current max</span>
            </div>
          </div>
        </div>
      </div>

      {/* City Overrides Table */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-[var(--admin-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-[var(--admin-primary)]" />
            <h3 className="text-lg font-bold text-[var(--admin-text)] tracking-tight">City-wise Overrides</h3>
          </div>
          <button 
            onClick={() => { 
              setEditingCity(null); 
              setSelectedCityId("");
              setSelectedVehicleTypeId("");
              setIsModalOpen(true); 
            }}
            className="text-sm text-[var(--admin-primary)] hover:underline font-medium cursor-pointer"
          >
            + Add City
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--admin-border)] text-[var(--admin-muted)] border-b border-[var(--admin-border)]">
              <tr>
                <th className="px-6 py-3 font-medium">City</th>
                <th className="px-6 py-3 font-medium">Vehicle</th>
                <th className="px-6 py-3 font-medium">Base Fare</th>
                <th className="px-6 py-3 font-medium">Per KM Rate</th>
                <th className="px-6 py-3 font-medium">Min Fare</th>
                <th className="px-6 py-3 font-medium">Cancel Fee</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[var(--admin-muted)]">
                    <Loader2 className="animate-spin w-6 h-6 mx-auto mb-2" />
                    Fetching fare rules...
                  </td>
                </tr>
              ) : cityOverrides.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[var(--admin-muted)]">
                    No city fare overrides found
                  </td>
                </tr>
              ) : (
                cityOverrides.map((row) => (
                  <tr key={row.id} className="hover:bg-[var(--admin-border)] transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--admin-text)]">{row.city}</td>
                    <td className="px-6 py-4 text-[var(--admin-muted)]">
                      <span className="px-2 py-1 bg-white/10 text-[var(--admin-text)] rounded text-xs font-semibold">
                        {row.vehicle}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--admin-muted)]">{row.baseFare}</td>
                    <td className="px-6 py-4 text-[var(--admin-muted)]">{row.perKm}</td>
                    <td className="px-6 py-4 text-[var(--admin-muted)]">{row.minFare}</td>
                    <td className="px-6 py-4 text-[var(--admin-muted)]">{row.cancellationFee}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { 
                          setEditingCity(row); 
                          setSelectedCityId(row.cityId);
                          setSelectedVehicleTypeId(row.vehicleTypeId);
                          setIsModalOpen(true); 
                        }}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md bg-[var(--admin-border)] border border-[var(--admin-border)] hover:bg-[var(--admin-border)] text-[var(--admin-text)] text-xs font-medium transition-colors cursor-pointer"
                      >
                        <Edit2 size={14} className="text-[var(--admin-muted)]" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit City Pricing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="h-16 border-b border-[var(--admin-border)] flex items-center justify-between px-6 bg-[var(--admin-border)] shrink-0">
              <h3 className="text-[var(--admin-text)] font-bold tracking-tight flex items-center gap-2">
                <MapPin size={18} className="text-[var(--admin-primary)]" />
                {editingCity ? `Edit ${editingCity.city} Pricing` : "Add New City Pricing"}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--admin-border)] text-[var(--admin-muted)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="p-6 bg-[var(--admin-background)] flex flex-col space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Select City</label>
                  <select
                    name="citySelection"
                    value={selectedCityId}
                    onChange={(e) => setSelectedCityId(e.target.value)}
                    required
                    disabled={!!editingCity}
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                  >
                    <option value="" disabled>-- Select City --</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                    {!editingCity && <option value="NEW">+ Add New City</option>}
                  </select>
                </div>

                {selectedCityId === "NEW" && (
                  <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                    <div>
                      <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">City Name</label>
                      <input 
                        name="newCityName"
                        type="text" 
                        required
                        placeholder="e.g. Bhilai" 
                        className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none placeholder:text-gray-600 focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">State (Optional)</label>
                      <input 
                        name="newCityState"
                        type="text" 
                        placeholder="e.g. Chhattisgarh" 
                        className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none placeholder:text-gray-600 focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Vehicle Type</label>
                  <select
                    name="vehicleTypeId"
                    value={selectedVehicleTypeId}
                    onChange={(e) => setSelectedVehicleTypeId(e.target.value)}
                    required
                    disabled={!!editingCity}
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all"
                  >
                    <option value="" disabled>-- Select Vehicle Type --</option>
                    {vehicleTypes.map((v) => (
                      <option key={v.id} value={v.id}>{v.name} ({v.category})</option>
                    ))}
                  </select>
                </div>

                <div key={selectedVehicleTypeId || "none"} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Base Fare (₹)</label>
                    <input 
                      name="baseFare"
                      type="number" 
                      step="any"
                      required
                      defaultValue={editingCity ? editingCity.baseFare.replace('₹', '') : (activeVehicle ? activeVehicle.baseFare : "")}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Per KM Rate (₹)</label>
                    <input 
                      name="perKm"
                      type="number" 
                      step="any"
                      required
                      defaultValue={editingCity ? editingCity.perKm.replace('₹', '') : (activeVehicle ? activeVehicle.perKmRate : "")}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Per Minute Rate (₹)</label>
                    <input 
                      name="perMin"
                      type="number" 
                      step="any"
                      required
                      defaultValue={editingCity ? editingCity.perMin.replace('₹', '') : (activeVehicle ? activeVehicle.perMinRate : "")}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Minimum Fare (₹)</label>
                    <input 
                      name="minFare"
                      type="number" 
                      step="any"
                      required
                      defaultValue={editingCity ? editingCity.minFare.replace('₹', '') : (activeVehicle ? activeVehicle.minFare : "")}
                      className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--admin-muted)] mb-1.5">Cancellation Fee (₹)</label>
                  <input 
                    name="cancellationFee"
                    type="number" 
                    step="any"
                    required
                    defaultValue={editingCity ? editingCity.cancellationFee.replace('₹', '') : "0"}
                    className="w-full h-10 bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-text)] outline-none focus:border-[var(--admin-primary)]/50 focus:ring-1 focus:ring-[var(--admin-primary)]/30 transition-all" 
                  />
                </div>
              </div>
              
              <div className="p-4 border-t border-[var(--admin-border)] bg-[var(--admin-border)] flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-[var(--admin-border)] text-[var(--admin-muted)] font-medium transition-colors text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-md bg-[var(--admin-primary)] text-[#0A0E1A] font-bold hover:bg-[#66E000] transition-colors text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(126,211,33,0.3)] cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
