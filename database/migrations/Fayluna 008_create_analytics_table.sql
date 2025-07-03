-- 008_create_analytics_table.sql

CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    blog_id INTEGER NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0 NOT NULL,
    clicks INTEGER DEFAULT 0 NOT NULL,
    unique_visitors INTEGER DEFAULT 0 NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    UNIQUE (blog_id, date)
);

CREATE INDEX idx_analytics_blog_id ON analytics(blog_id);
CREATE INDEX idx_analytics_date ON analytics(date);
