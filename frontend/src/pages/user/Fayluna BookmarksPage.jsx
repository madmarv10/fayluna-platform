import React, { useEffect, useState } from "react";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch from backend or local storage
  useEffect(() => {
    const fetchBookmarks = async () => {
      // Replace this with your API or storage logic
      const data = [
        {
          id: "1",
          title: "How to Grow a Tech Blog",
          description: "Tips and tricks for growing your blog audience.",
          image: "https://via.placeholder.com/120x80",
          link: "https://techblogtips.example.com",
        },
        {
          id: "2",
          title: "10 JavaScript Mistakes to Avoid",
          description: "Common errors developers make in JavaScript.",
          image: "https://via.placeholder.com/120x80",
          link: "https://jsmistakes.example.com",
        },
      ];

      setBookmarks(data);
      setLoading(false);
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Blogs</h1>

      {loading ? (
        <p>Loading bookmarks...</p>
      ) : bookmarks.length === 0 ? (
        <p>You have no bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex items-center bg-white shadow-md p-4 rounded-lg"
            >
              <img
                src={bookmark.image}
                alt={bookmark.title}
                className="w-28 h-20 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{bookmark.title}</h2>
                <p className="text-sm text-gray-600">{bookmark.description}</p>
              </div>
              <a
                href={bookmark.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
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

export default BookmarksPage;
