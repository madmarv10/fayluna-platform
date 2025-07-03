import React from 'react';

const BookmarkButton = ({ isBookmarked, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isBookmarked ? '#ff6347' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 14px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.3s ease',
      }}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    </button>
  );
};

export default BookmarkButton;
