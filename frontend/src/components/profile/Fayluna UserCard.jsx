import React from "react";
import FollowButton from "@/components/shared/FollowButton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, currentUserId, onFollow, onUnfollow }) => {
  const navigate = useNavigate();
  const isOwnProfile = currentUserId === user.id;

  const handleNavigate = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition cursor-pointer">
      <CardContent
        onClick={handleNavigate}
        className="flex items-center gap-4 p-4"
      >
        <Avatar className="h-14 w-14">
          <AvatarImage
            src={user.avatar || "/default-avatar.png"}
            alt={user.name}
          />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
        {!isOwnProfile && (
          <FollowButton
            isFollowingInitial={user.isFollowing}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            targetUserId={user.id}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
