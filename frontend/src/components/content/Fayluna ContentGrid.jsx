import React from "react";
import ContentCard from "./ContentCard";

const ContentGrid = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        No content available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ContentCard
          key={item.id}
          id={item.id}
          title={item.title}
          snippet={item.snippet}
          imageUrl={item.imageUrl}
          author={item.author}
          date={item.date}
          category={item.category}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
