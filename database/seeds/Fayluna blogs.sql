-- 002_blogs_seed.sql

INSERT INTO blogs (user_id, title, url, description, image_url, created_at, updated_at)
VALUES
  (1, 'Alice’s Adventures in Tech', 'https://aliceblog.com/post1', 'A deep dive into the latest web technologies.', 'https://aliceblog.com/images/post1.jpg', NOW(), NOW()),
  (2, 'Bob’s Thoughts on Startups', 'https://bobblog.com/startups', 'Insights and stories from the startup world.', 'https://bobblog.com/images/startups.jpg', NOW(), NOW()),
  (3, 'Carol’s Travel Diary', 'https://caroltravelblog.com/europe-2024', 'My experiences traveling across Europe.', 'https://caroltravelblog.com/images/europe.jpg', NOW(), NOW());

-- Notes:
-- Ensure the user_id references existing users in the users table.
