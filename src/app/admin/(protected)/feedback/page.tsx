"use client";

import React, { useState } from "react";
import { Star, Search, Filter } from "lucide-react";

export default function FeedbackPage() {
  const feedbacks = [
    { id: "FDB-990", user: "Priya Sharma", role: "Customer", rating: 5, comment: "Excellent service! The driver was very polite and on time.", date: "Just now" },
    { id: "FDB-989", user: "Ramesh Kumar", role: "Driver", rating: 4, comment: "App works great, but the map navigation could be a bit more accurate.", date: "2 hrs ago" },
    { id: "FDB-988", user: "Amit Verma", role: "Customer", rating: 2, comment: "Driver was late and the car wasn't very clean.", date: "1 day ago" },
    { id: "FDB-987", user: "Sneha Gupta", role: "Customer", rating: 5, comment: "Very affordable and safe feeling.", date: "2 days ago" },
  ];

  const averageRating = 4.3;
  const totalReviews = 1248;

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
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-2">
            <span>Admin</span>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-gray-200">Feedback</span>
          </nav>
          <h2 className="text-3xl font-bold tracking-tight text-white">User Feedback & Ratings</h2>
          <p className="text-gray-400 mt-1">
            Review feedback from customers and drivers to improve service quality.
          </p>
        </div>
      </div>

      {/* Prominent Stat Card */}
      <div className="rounded-xl border border-white/10 bg-[#111827]/50 p-6 shadow-sm flex items-center gap-6">
        <div className="flex flex-col items-center justify-center h-24 w-24 rounded-full border-4 border-[var(--admin-primary)] bg-white/5 shrink-0">
          <span className="text-3xl font-bold text-white">{averageRating}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Average Platform Rating</h3>
          <div className="flex items-center gap-1 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-gray-400">Based on {totalReviews.toLocaleString()} reviews in the last 30 days.</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="rounded-xl border border-white/10 bg-[#111827]/50 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Row */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by user name..."
              className="w-full h-9 bg-[#0A0E1A] border border-white/10 focus:border-[var(--admin-primary)]/50 rounded-md pl-9 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all"
            />
          </div>
          
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
          >
            <option value="all">Role: All</option>
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
          </select>

          <select 
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="h-9 bg-[#0A0E1A] border border-white/10 rounded-md px-3 text-sm text-gray-300 outline-none focus:border-[var(--admin-primary)]/50"
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
            <div className="p-12 text-center text-gray-500">
              No reviews found matching your criteria.
            </div>
          ) : (
            filteredFeedbacks.map((item) => (
              <div key={item.id} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-white">{item.user}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-gray-500/20 bg-gray-500/10 text-gray-400">
                        {item.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(item.rating)}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">"{item.comment}"</p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{item.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
