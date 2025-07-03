import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MySubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Replace with actual API call to fetch user's submissions
        // const res = await fetch("/api/my-submissions");
        // const data = await res.json();

        // Simulated data
        const data = [
          {
            id: "1",
            title: "My Travel Blog",
            description: "Adventures in Europe",
            image: "https://example.com/travel.jpg",
            link: "https://myblog.com/travel",
          },
          {
            id: "2",
            title: "Tech Insights",
            description: "Latest trends in AI and coding",
            image: "https://example.com/tech.jpg",
            link: "https://myblog.com/ai",
          },
        ];

        setSubmissions(data);
      } catch (err) {
        setMessage("Failed to load your submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this submission?");
    if (!confirmed) return;

    try {
      // Replace with actual API DELETE call
      // await fetch(`/api/submissions/${id}`, { method: "DELETE" });

      // Simulated delete
      setSubmissions((prev) => prev.filter((item) => item.id !== id));
      setMessage("Submission deleted.");
    } catch (err) {
      setMessage("Failed to delete submission.");
    }
  };

  if (loading) return <p className="text-center p-4">Loading your submissions...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}

      {submissions.length === 0 ? (
        <p>You haven't submitted any blogs yet.</p>
      ) : (
        <div className="grid gap-6">
          {submissions.map((post) => (
            <div key={post.id} className="bg-white shadow rounded-lg p-4 flex items-center">
              <img
                src={post.image}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.description}</p>
                <div className="mt-2 flex gap-4">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Visit Blog
                  </a>
                  <Link
                    to={`/edit/${post.id}`}
                    className="text-yellow-600 text-sm hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissionsPage;
