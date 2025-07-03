import React from "react";

const ContentCard = ({
  title,
  snippet,
  imageUrl,
  author,
  date,
  category,
  link, // ← ensure this prop is passed in
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover"
          />
        </a>
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          {category && (
            <span className="inline-block text-xs text-purple-600 font-medium uppercase tracking-wider mb-1">
              {category}
            </span>
          )}
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors">
              {title}
            </h3>
          </a>
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {snippet}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>By {author}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
