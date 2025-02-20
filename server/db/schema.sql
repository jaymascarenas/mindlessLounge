-- DROP DATABASE
DROP DATABASE IF EXISTS mindless_lounge_db;

-- CREATE DATABASE
CREATE DATABASE mindless_lounge_db;

\c mindless_lounge_db;

-- -- Create Users table
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(30) NOT NULL UNIQUE,
--   email VARCHAR(255) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create Profiles table
-- CREATE TABLE profiles (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL UNIQUE,
--   bio TEXT DEFAULT '',
--   profile_picture VARCHAR(255),
--   interests TEXT[] DEFAULT '{}',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) 
--     REFERENCES users(id)
--     ON DELETE CASCADE
-- );

-- -- Create Posts table
-- CREATE TABLE posts (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   content TEXT NOT NULL,
--   media_url VARCHAR(255),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) 
--     REFERENCES users(id)
--     ON DELETE CASCADE
-- );