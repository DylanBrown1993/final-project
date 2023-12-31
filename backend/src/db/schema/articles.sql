DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id BIGINT PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  header_image TEXT NOT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
