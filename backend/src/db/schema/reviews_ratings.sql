DROP TABLE IF EXISTS reviews_ratings CASCADE;

CREATE TABLE reviews_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating INTEGER NOT NULL,
  reviews_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);