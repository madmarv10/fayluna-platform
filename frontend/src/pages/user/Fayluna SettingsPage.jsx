import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: "",
    website: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Simulated fetch of user data
  useEffect(() => {
    const fetchUserSettings = async () => {
      // Replace with your backend fetch logic
      const user = {
        name: "Jane Doe",
        bio: "Avid blogger and tech lover.",
        avatar: "https://via.placeholder.com/100",
        website: "https://janesblog.com",
      };
      setFormData(user);
    };

    fetchUserSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Replace with actual API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveMessage("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveMessage("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

        {saveMessage && (
          <p className={`mt-2 text-sm ${saveMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {saveMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default SettingsPage;
