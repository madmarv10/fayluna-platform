import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditSubmissionPage = () => {
  const { postId } = useParams(); // assuming route is /edit/:postId
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Example API call: Replace with your backend logic
        // const res = await fetch(`/api/blogs/${postId}`);
        // const data = await res.json();

        // Simulated example post
        const data = {
          title: "My Awesome Blog",
          description: "This is a description",
          image: "https://example.com/image.jpg",
          link: "https://example.com",
        };

        setForm(data);
      } catch (err) {
        setMessage("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image || !form.link) {
      setMessage("All fields are required.");
      return;
    }

    try {
      // Example API call: Replace with your backend logic
      // await fetch(`/api/blogs/${postId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      console.log("Updated submission:", form); // Remove in production
      setMessage("Blog updated successfully!");

      // Optionally navigate after success
      // navigate(`/blog/${postId}`);
    } catch (err) {
      setMessage("Error updating blog.");
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Submission</h1>

      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Blog title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="A short summary of your blog"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Blog Link</label>
          <input
            name="link"
            type="text"
            value={form.link}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="https://yourblog.com/post"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditSubmissionPage;
