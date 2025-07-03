import React from 'react';

const PostsTable = ({ posts }) => {
  /*
    posts: array of objects like
    [
      {
        id: '123',
        title: 'My Blog Post',
        description: 'A short summary...',
        photoUrl: 'https://example.com/photo.jpg',
        link: 'https://blog.example.com/post/123'
      },
      ...
    ]
  */

  if (!posts.length) {
    return <p>No posts submitted yet.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ddd' }}>
          <th style={{ textAlign: 'left', padding: '8px' }}>Photo</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Link</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(({ id, title, description, photoUrl, link }) => (
          <tr key={id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '8px' }}>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={title}
                  style={{ width: '80px', height: 'auto', borderRadius: '4px' }}
                />
              ) : (
                <span>No photo</span>
              )}
            </td>
            <td style={{ padding: '8px', verticalAlign: 'top' }}>{title}</td>
            <td style={{ padding: '8px', verticalAlign: 'top' }}>{description}</td>
            <td style={{ padding: '8px', verticalAlign: 'top' }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Visit Blog
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;
