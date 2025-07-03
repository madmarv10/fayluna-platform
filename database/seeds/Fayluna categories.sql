-- 003_categories_seed.sql

INSERT INTO categories (name, description, created_at, updated_at)
VALUES
  ('Technology', 'Blogs and articles about technology trends and innovations.', NOW(), NOW()),
  ('Startups', 'Insights and stories about startups and entrepreneurship.', NOW(), NOW()),
  ('Travel', 'Travel diaries, tips, and guides from around the world.', NOW(), NOW()),
  ('Health', 'Health and wellness advice, news, and personal stories.', NOW(), NOW()),
  ('Finance', 'Personal finance, investing, and economic analysis.', NOW(), NOW()),
  ('Lifestyle', 'Lifestyle, culture, and daily living topics.', NOW(), NOW());

-- Notes:
-- Add or adjust categories according to your app's needs.
