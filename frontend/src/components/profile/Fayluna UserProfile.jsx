import React from "react";
import { Button } from "@/components/ui/button";
import ContentCard from "./ContentCard";

const UserProfile = ({ user, userContent, isCurrentUser, onEditProfile }) => {
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>

        {isCurrentUser && (
          <Button className="mt-4 sm:mt-0" onClick={onEditProfile}>
            Edit Profile
          </Button>
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="mb-8 text-gray-700 whitespace-pre-line">{user.bio}</div>
      )}

      {/* Content Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Content</h2>
        {userContent && userContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userContent.map((item) => (
              <ContentCard key={item.id} post={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No content created yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
