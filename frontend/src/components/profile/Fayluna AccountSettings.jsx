import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const AccountSettings = ({ user, onUpdateAccount, onDeleteAccount }) => {
  const [formData, setFormData] = useState({
    email: user.email || "",
    currentPassword: "",
    newPassword: "",
    notifications: user.notifications ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onUpdateAccount(formData);
    } catch (err) {
      setError("Failed to update account. Please check your information.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        await onDeleteAccount();
      } catch (err) {
        setError("Failed to delete account.");
      }
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          className="w-full border rounded px-3 py-2"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          className="w-full border rounded px-3 py-2"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block font-medium mb-1">New Password</label>
        <input
          type="password"
          name="newPassword"
          className="w-full border rounded px-3 py-2"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      {/* Notification Toggle */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="notifications"
          name="notifications"
          checked={formData.notifications}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="notifications" className="font-medium">
          Receive email notifications
        </label>
      </div>

      <Button type="submit" disabled={saving} className="mr-4">
        {saving ? "Saving..." : "Save Changes"}
      </Button>

      {/* Delete Account */}
      <div className="mt-6">
        <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
        <Button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          {confirmDelete ? "Click again to confirm" : "Delete Account"}
        </Button>
      </div>
    </form>
  );
};

export default AccountSettings;
