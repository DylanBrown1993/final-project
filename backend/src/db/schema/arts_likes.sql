DROP TABLE IF EXISTS arts_likes CASCADE;

CREATE TABLE arts_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  liked BOOLEAN,
  count INTEGER,
  art_id INTEGER REFERENCES arts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
