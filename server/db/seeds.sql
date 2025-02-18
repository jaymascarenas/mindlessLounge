-- Insert some users
INSERT INTO users (username, email, password, created_at, updated_at)
VALUES
  ('john_doe', 'john.doe@example.com', 'hashed_password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('jane_smith', 'jane.smith@example.com', 'hashed_password', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert some posts
INSERT INTO posts (user_id, content, created_at, updated_at)
VALUES
  (1, 'Having a great day!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'Looking forward to the weekend!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Get all posts with user information (joining users and posts)
-- SELECT p.id, p.content, p.created_at, u.username
-- FROM posts p
-- JOIN users u ON p.user_id = u.id
-- ORDER BY p.created_at DESC;

-- This query retrieves all posts and joins the users table to get the username of the user who made each post. You can sort them by the created_at field to show the latest posts first
 