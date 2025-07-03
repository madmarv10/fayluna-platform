import React from 'react';

const BookmarkCard = ({ bookmark }) => {
  /*
    bookmark: {
      id: string,
      title: string,
      photoUrl: string,
      description?: string,
      link: string,
    }
  */

  const { title, photoUrl, description, link } = bookmark;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: '320px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
      }}
    >
      {photoUrl && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
          <img
            src={photoUrl}
            alt={title}
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
        </a>
      )}

      <div style={{ padding: '12px' }}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            display: 'block',
            marginBottom: description ? '8px' : '0',
          }}
        >
          {title}
        </a>

        {description && (
          <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.4' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;
