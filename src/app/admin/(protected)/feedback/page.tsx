"use client";

import React, { useState, useEffect } from "react";
import { Star, Search, Filter } from "lucide-react";
import { api } from "@/lib/api";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        setIsLoading(true);
        const [feedbackRes, statsRes] = await Promise.all([
          api.get("/admin/feedback"),
          api.get("/admin/feedback/analytics")
        ]);
        
        const finalItems = feedbackRes.data?.feedback || feedbackRes.data?.items || [];
        
        const formatted = finalItems.map((f: any) => ({
          id: f.id,
          user: f.user?.name || "Anonymous",
          role: f.userRole || "Customer",
          rating: f.rating || 5,
          comment: f.feedback || f.subject,
          date: new Date(f.createdAt).toLocaleString(),
          raw: f
        }));
        
        setFeedbacks(formatted);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch feedback", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedbackData();
  }, []);

  const averageRating = stats?.ratingMetrics?.averageRating || 0;
  const totalReviews = stats?.totalFeedbackCount || 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredFeedbacks = feedbacks.filter(f => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = f.user.toLowerCase().includes(query) || f.comment.toLowerCase().includes(query);
    const matchesRole = roleFilter === "all" || f.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesRating = ratingFilter === "all" || f.rating.toString() === ratingFilter;
    return matchesSearch && matchesRole && matchesRating;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-[var(--admin-primary)] text-[var(--admin-primary)]" : "text-gray-600"}
      />
    ));
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans min-h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <nav className="flex items-center text-sm font-medium text-[var(--admin-muted)] mb-2">
            <span>Admin</span>
            <span className="mx-2 text-[var(--admin-text)]/20">/</span>
            <span className="text-gray-200">Feedback</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">User Feedback & Ratings</h2>
          <p className="text-[var(--admin-muted)] mt-1">
            Review feedback from customers and drivers to improve service quality.
          </p>
        </div>
      </div>

      {/* Prominent Stat Card */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-6 shadow-sm flex items-center gap-6">
        <div className="flex flex-col items-center justify-center h-24 w-24 rounded-full border-4 border-[var(--admin-primary)] bg-[var(--admin-border)] shrink-0">
          <span className="text-3xl font-bold text-[var(--admin-text)]">{averageRating}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--admin-text)] mb-1">Average Platform Rating</h3>
          <div className="flex items-center gap-1 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-[var(--admin-muted)]">Based on {totalReviews.toLocaleString()} reviews in the last 30 days.</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm overflow-hidden flex flex-col">
        {/* Filter Row */}
        <div className="p-4 border-b border-[var(--admin-border)] bg-[var(--admin-border)] flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--admin-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by user name..."
              className="w-full h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-muted)] outline-none transition-all"
            />
          </div>
          
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Role: All</option>
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
          </select>

          <select 
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="h-9 bg-[var(--admin-background)] border border-[var(--admin-border)] rounded-md px-3 text-sm text-[var(--admin-muted)] outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Rating: All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Feedback List */}
        <div className="divide-y divide-white/10">
          {filteredFeedbacks.length === 0 ? (
            <div className="p-12 text-center text-[var(--admin-muted)]">
              No reviews found matching your criteria.
            </div>
          ) : (
            filteredFeedbacks.map((item) => (
              <div key={item.id} className="p-6 hover:bg-[var(--admin-border)] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-[var(--admin-text)]">{item.user}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-gray-500/20 bg-gray-500/10 text-[var(--admin-muted)]">
                        {item.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(item.rating)}
                    </div>
                    <p className="text-[var(--admin-muted)] text-sm leading-relaxed">"{item.comment}"</p>
                  </div>
                  <span className="text-xs text-[var(--admin-muted)] shrink-0">{item.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
