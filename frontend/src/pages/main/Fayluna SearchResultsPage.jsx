import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const dummyPosts = [
  {
    id: '1',
    title: 'How I Built My Blog with Next.js',
    description: 'A detailed walkthrough of setting up a blog with Next.js and Tailwind.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/nextjs-blog',
    author: 'Jane Doe',
    date: '2025-05-01',
  },
  {
    id: '2',
    title: 'Self-Taught Coding Journey',
    description: 'My path from zero to web developer, and tips for beginners.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/self-taught-dev',
    author: 'John Smith',
    date: '2025-04-20',
  },
  {
    id: '3',
    title: 'Photography Tips for Bloggers',
    description: 'How to take and edit stunning blog photos that attract readers.',
    image: 'https://via.placeholder.com/400x200',
    url: 'https://example.com/photo-tips',
    author: 'Sarah Lee',
    date: '2025-03-15',
  },
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.toLowerCase() || '';

  const filteredPosts = dummyPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Search Results for: <span className="text-blue-600">"{searchTerm}"</span>
      </h2>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded shadow hover:shadow-lg transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{post.description}</p>
                <Link
                  to={`/post/${post.id}`}
                  className="mt-3 inline-block text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
