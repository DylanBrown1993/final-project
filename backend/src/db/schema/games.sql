DROP TABLE IF EXISTS games CASCADE;

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL
);