import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const FollowButton = ({
  isFollowingInitial,
  onFollow,
  onUnfollow,
  targetUserId,
}) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      if (isFollowing) {
        await onUnfollow(targetUserId);
        setIsFollowing(false);
      } else {
        await onFollow(targetUserId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Follow action failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={isFollowing ? "outline" : "default"}
      className={`flex items-center gap-2 ${
        isFollowing ? "border-gray-400 text-gray-700" : "bg-blue-600 text-white"
      }`}
    >
      <Heart
        className={isFollowing ? "fill-current text-red-500" : "text-white"}
        size={16}
      />
      {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
