import React from "react";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import MetricsCard from "../components/analytics/MetricsCard";
import PerformanceChart from "../components/analytics/PerformanceChart";
import PostsTable from "../components/analytics/PostsTable";

const AnalyticsPage = () => {
  const metrics = {
    totalClicks: 1342,
    totalSubmissions: 28,
    followers: 67,
    bookmarks: 154,
  };

  const performanceData = [
    { date: "2025-06-01", clicks: 50 },
    { date: "2025-06-02", clicks: 82 },
    { date: "2025-06-03", clicks: 64 },
    { date: "2025-06-04", clicks: 95 },
    { date: "2025-06-05", clicks: 72 },
  ];

  const topPosts = [
    {
      id: "1",
      title: "AI & the Future of Coding",
      views: 523,
      link: "https://example.com/blog1",
    },
    {
      id: "2",
      title: "Top Travel Hacks in 2025",
      views: 381,
      link: "https://example.com/blog2",
    },
    {
      id: "3",
      title: "Photography for Beginners",
      views: 245,
      link: "https://example.com/blog3",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Analytics Overview</h1>

      <AnalyticsDashboard>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard label="Total Clicks" value={metrics.totalClicks} />
          <MetricsCard label="Submissions" value={metrics.totalSubmissions} />
          <MetricsCard label="Followers" value={metrics.followers} />
          <MetricsCard label="Bookmarks" value={metrics.bookmarks} />
        </div>
      </AnalyticsDashboard>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
        <PerformanceChart data={performanceData} />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Top Performing Posts</h2>
        <PostsTable posts={topPosts} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
