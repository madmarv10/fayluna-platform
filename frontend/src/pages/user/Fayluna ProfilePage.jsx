import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch - replace with actual API call
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Replace with your backend logic
        const fetchedUser = {
          username: username,
          name: "Jane Doe",
          bio: "Avid writer and tech explorer.",
          avatar: "https://via.placeholder.com/100",
          website: "https://janesblog.com",
        };

        const fetchedPosts = [
          {
            id: 1,
            title: "Why Static Sites Are the Future",
            image: "https://via.placeholder.com/400x200",
            description: "Exploring the benefits of static site generators.",
            link: "https://janesblog.com/static-sites",
          },
          {
            id: 2,
            title: "Building a Blog with React",
            image: "https://via.placeholder.com/400x200",
            description: "Step-by-step guide to making a blog using React and Firebase.",
            link: "https://janesblog.com/react-blog",
          },
        ];

        setUserData(fetchedUser);
        setUserPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) return <div className="p-6">Loading profile...</div>;

  if (!userData) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-semibold text-red-500">User not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Info */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-24 h-24 rounded-full object-cover border shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-gray-600">@{userData.username}</p>
          <p className="mt-2">{userData.bio}</p>
          {userData.website && (
            <a
              href={userData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1 block"
            >
              {userData.website}
            </a>
          )}
        </div>
      </div>

      {/* Blog Submissions */}
      <h2 className="text-xl font-semibold mb-4">Submitted Blog Links</h2>
      {userPosts.length === 0 ? (
        <p className="text-gray-500">No blog submissions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow hover:shadow-md transition">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-t-xl" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block mt-2"
                >
                  Visit Blog →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
