import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyPosts = [
  {
    id: '1',
    title: 'How I Built My Blog with Next.js',
    description: 'A detailed walkthrough of setting up a blog with Next.js and Tailwind.',
    image: 'https://via.placeholder.com/800x400',
    url: 'https://example.com/nextjs-blog',
    author: 'Jane Doe',
    date: '2025-05-01',
  },
  {
    id: '2',
    title: 'Self-Taught Coding Journey',
    description: 'My path from zero to web developer, and tips for beginners.',
    image: 'https://via.placeholder.com/800x400',
    url: 'https://example.com/self-taught-dev',
    author: 'John Smith',
    date: '2025-04-20',
  },
];

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = dummyPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold text-red-500">Blog post not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg shadow"
      />
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-500 mt-1">
          By <span className="font-medium">{post.author}</span> on{' '}
          {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-700">{post.description}</p>

        <div className="mt-6">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-700 text-white font-semibold rounded shadow hover:bg-blue-800 transition"
          >
            Visit Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
