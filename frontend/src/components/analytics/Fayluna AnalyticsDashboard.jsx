import React, { useEffect, useState } from "react";

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/analytics");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err.message || "Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!analytics) return null;

  return (
    <div className="analytics-dashboard" style={{ maxWidth: "700px", margin: "auto" }}>
      <h2>Analytics Dashboard</h2>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Total Blog Submissions:</strong> {analytics.totalSubmissions}
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <strong>Total Clicks Across All Blogs:</strong> {analytics.totalClicks}
      </div>

      <h3>Clicks per Blog</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {analytics.blogs.map((blog) => (
          <li
            key={blog.id}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: "#f9f9f9",
            }}
          >
            <strong>{blog.title}</strong>
            <div
              style={{
                background: "#007bff",
                height: "20px",
                width: `${(blog.clicks / analytics.totalClicks) * 100}%`,
                maxWidth: "100%",
                borderRadius: "4px",
                marginTop: "4px",
                color: "white",
                textAlign: "right",
                paddingRight: "6px",
                fontSize: "12px",
                lineHeight: "20px",
              }}
            >
              {blog.clicks} clicks
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsDashboard;
