-- 001_users_seed.sql

INSERT INTO users (username, email, password_hash, bio, profile_image_url, created_at, updated_at)
VALUES
  ('alice', 'alice@example.com', '$2b$10$abcdefg1234567890hashedpassword', 'Hi, I am Alice!', 'https://example.com/images/alice.jpg', NOW(), NOW()),
  ('bob', 'bob@example.com', '$2b$10$hijklmn0987654321hashedpassword', 'Bob here. Love blogging!', 'https://example.com/images/bob.jpg', NOW(), NOW()),
  ('carol', 'carol@example.com', '$2b$10$opqrstuvwxyz123456hashedpassword', 'Carol\'s blog space.', 'https://example.com/images/carol.jpg', NOW(), NOW());

-- Notes:
-- Replace the password_hash values with actual bcrypt hashes for security.
