import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ProfileSettings = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
    password: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData((prev) => ({ ...prev, avatar: fileReader.result }));
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSave(formData);
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Avatar */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Profile Picture</label>
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
        )}
        <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="4"
        />
      </div>

      {/* Optional Password */}
      <div className="mb-6">
        <label className="block font-medium mb-1">New Password (optional)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default ProfileSettings;
