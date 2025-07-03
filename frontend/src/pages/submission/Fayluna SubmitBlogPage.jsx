import React, { useState } from "react";

const SubmitBlogPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.description || !form.image || !form.link) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      // Example: send to backend
      // await fetch("/api/blogs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      console.log("Submitted:", form); // Remove in production

      setSuccessMessage("Blog submitted successfully!");
      setErrorMessage("");
      setForm({ title: "", description: "", image: "", link: "" });
    } catch (error) {
      console.error("Error submitting blog:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit a Blog</h1>

      {successMessage && (
        <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mb-4 text-red-600 font-medium">{errorMessage}</p>
      )}

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
            placeholder="A brief summary of the blog"
            rows={3}
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
            type="url"
            value={form.link}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="https://yourblog.com/post"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default SubmitBlogPage;
