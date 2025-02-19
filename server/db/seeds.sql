-- Insert users with hashed passwords
INSERT INTO users (username, email, password, created_at, updated_at)
VALUES
  ('john_doe', 'john.doe@example.com', '$2b$10$YourHashedPasswordHere', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('jane_smith', 'jane.smith@example.com', '$2b$10$YourHashedPasswordHere', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('tech_guru', 'tech.guru@example.com', '$2b$10$YourHashedPasswordHere', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('creative_mind', 'creative@example.com', '$2b$10$YourHashedPasswordHere', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert profiles for each user
INSERT INTO profiles (user_id, bio, profile_picture, interests, created_at, updated_at)
VALUES
  (1, 'Software developer by day, gamer by night', '/images/default-1.jpg', ARRAY['coding', 'gaming', 'coffee'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Digital artist and photography enthusiast', '/images/default-2.jpg', ARRAY['art', 'photography', 'travel'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'Tech enthusiast and lifestyle blogger', '/images/default-3.jpg', ARRAY['technology', 'blogging', 'fitness'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (4, 'Creative writer and book lover', '/images/default-4.jpg', ARRAY['writing', 'reading', 'music'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample posts
INSERT INTO posts (user_id, content, media_url, created_at, updated_at)
VALUES
  (1, 'Just deployed my first full-stack application! 🚀 #coding #achievement', '/uploads/post1.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (1, 'Working on some exciting new features today! Any guesses?', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Captured this beautiful sunset during my evening walk 📸', '/uploads/post2.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Testing out my new camera lens. The results are amazing!', '/uploads/post3.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'Just reviewed the latest tech gadget. Blog post coming soon!', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (4, 'Reading my favorite book for the tenth time. Some stories never get old 📚', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Helpful SELECT queries for testing (commented out)
/*
-- Get all posts with user information team number one rocks
SELECT p.id, p.content, p.created_at, u.username, pr.profile_picture
FROM posts p
JOIN users u ON p.user_id = u.id
JOIN profiles pr ON u.id = pr.user_id
ORDER BY p.created_at DESC;

-- Get user profile with their post count
SELECT u.username, pr.bio, pr.interests, COUNT(p.id) as post_count
FROM users u
JOIN profiles pr ON u.id = pr.user_id
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.username, pr.bio, pr.interests;

-- Get specific user's posts with their profile info
SELECT p.content, p.created_at, pr.bio, pr.interests
FROM users u
JOIN posts p ON u.id = p.user_id
JOIN profiles pr ON u.id = pr.user_id
WHERE u.username = 'john_doe'
ORDER BY p.created_at DESC;
*/