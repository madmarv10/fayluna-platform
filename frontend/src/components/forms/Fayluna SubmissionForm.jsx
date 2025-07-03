import React, { useState } from 'react';

const SubmissionForm = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!link.trim() || !validateUrl(link)) {
      setError('A valid blog link is required.');
      return;
    }
    if (photoUrl && !validateUrl(photoUrl)) {
      setError('Photo URL must be valid.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    setError('');
    setSuccess('');

    const formData = {
      title: title.trim(),
      link: link.trim(),
      imageUrl: photoUrl.trim(), // renamed to imageUrl for backend consistency
      snippet: description.trim(), // renamed for display card consistency
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit blog.');
      }

      setSuccess('Blog submitted successfully!');
      setTitle('');
      setLink('');
      setPhotoUrl('');
      setDescription('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form space-y-4 p-4 bg-white rounded-md shadow-md max-w-lg mx-auto">
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <label className="block">
        <span className="block text-sm font-medium text-gray-700">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-gray-700">Blog Link</span>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-gray-700">Photo URL (optional)</span>
        <input
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-gray-700">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description"
          required
          className="mt-1 block w-full border rounded p-2"
        />
      </label>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Submit Blog Link
      </button>
    </form>
  );
};

export default SubmissionForm;
