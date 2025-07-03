import React from 'react';

const BookmarksList = ({ bookmarks }) => {
  /*
    bookmarks: array of objects like
    [
      {
        id: 'abc123',
        title: 'Example Blog',
        photoUrl: 'https://example.com/photo.jpg',
        link: 'https://example.com/blog-post'
      },
      ...
    ]
  */

  if (!bookmarks.length) {
    return <p>No bookmarks yet.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {bookmarks.map(({ id, title, photoUrl, link }) => (
        <li
          key={id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            borderBottom: '1px solid #eee',
            paddingBottom: '8px',
          }}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={title}
              style={{ width: '60px', height: '60px', borderRadius: '6px', marginRight: '12px', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ccc',
                borderRadius: '6px',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '12px',
              }}
            >
              No Image
            </div>
          )}

          <div>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 'bold', fontSize: '16px', color: '#007bff', textDecoration: 'none' }}
            >
              {title}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookmarksList;
