import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkCard from './BookmarkCard';

const dummyBookmarks = [
  {
    id: 1,
    title: 'Building a Tech Blog with React',
    description: 'Step-by-step guide on how to build a blog using React and Node.js.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/react-blog',
  },
  {
    id: 2,
    title: 'My Journey into AI',
    description: 'Sharing thoughts and projects I built while learning AI.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/ai-journey',
  },
  {
    id: 3,
    title: 'Travel Blog: Exploring Japan',
    description: 'Photos and stories from my trip across Japan.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/japan-travel',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">BlogShare</h1>
        <nav className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
          <Link to="/submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit a Blog</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} BlogShare. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
