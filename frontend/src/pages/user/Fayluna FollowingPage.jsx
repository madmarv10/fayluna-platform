import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch of followed users/blogs
  useEffect(() => {
    const fetchFollowing = async () => {
      // Replace with real API call
      const data = [
        {
          id: "1",
          title: "The Creative Pen",
          description: "Thoughts and stories from a writer's journey.",
          avatar: "https://via.placeholder.com/60",
          link: "https://creativepen.blog",
        },
        {
          id: "2",
          title: "Code & Coffee",
          description: "Daily musings of a developer over coffee.",
          avatar: "https://via.placeholder.com/60",
          link: "https://codecoffee.dev",
        },
      ];

      setFollowing(data);
      setLoading(false);
    };

    fetchFollowing();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Following</h1>

      {loading ? (
        <p>Loading...</p>
      ) : following.length === 0 ? (
        <p>You’re not following any blogs yet.</p>
      ) : (
        <ul className="space-y-4">
          {following.map((item) => (
            <li key={item.id} className="flex items-center bg-white shadow-md p-4 rounded-lg">
              <img
                src={item.avatar}
                alt={item.title}
                className="w-14 h-14 rounded-full mr-4 object-cover"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700"
              >
                Visit
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingPage;
