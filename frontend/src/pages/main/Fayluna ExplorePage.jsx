import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';

const dummyBookmarks = [
  {
    id: 1,
    title: 'How I Built My Blog with Next.js',
    description: 'A detailed walkthrough of setting up a blog with Next.js and Tailwind.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/nextjs-blog',
  },
  {
    id: 2,
    title: 'Why I Love Minimalist Web Design',
    description: 'Exploring the principles and beauty of minimal UI design.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/minimalist-design',
  },
  {
    id: 3,
    title: 'Self-Taught Coding Journey',
    description: 'My path from zero to web developer, and tips for beginners.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/self-taught-dev',
  },
  {
    id: 4,
    title: 'Exploring Nature Photography',
    description: 'How I combine my love for tech and photography in the wild.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/nature-photo',
  },
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = dummyBookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">Explore Blogs</h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full max-w-md p-2 rounded border border-gray-300 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No blogs found.</p>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;
