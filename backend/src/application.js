const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express()
const port = 3001
// const db = require("./db")

const pool = new Pool({
  host: "localhost",
  user: "labber",
  port: 5432,
  password: "123",
  database: "final",
});

pool.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.json({message:"hello!"})
})

app.get('/users', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM users`);
  res.send(rows)
})

app.get('/reviews', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM reviews`);
  res.send(rows)
})

app.get('/games', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM games`);
  res.send(rows)
})

app.get('/colorjump', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM games`);
  res.send(rows);
});

app.get('/review/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT * FROM reviews WHERE id = $1`, [reviewId]); 
    if (rows.length === 0) {
      return res.status(404).json({error: 'Review Not Found'});
    }
    res.json(rows[0]);
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

app.get('/articles', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM articles`);
  res.send(rows)
})

app.get('/article/:id', async (req, res) => {
  const articleId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT * FROM articles WHERE id = $1`, [articleId]); 
    if (rows.length === 0) {
      return res.status(404).json({error: 'Article Not Found'});
    }
    res.json(rows[0]);
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

app.get('/api/likes', async (req, res) => {
  try {
    const result = await pool.query('SELECT count FROM article_likes');
    res.json({likes: result.rows[0].count});
  } catch (error) {
    console.error('Error retrieving likes count:', error);
    res.status(500).json({ error: 'Error retrieving likes'});
  }
});

app.get('/api/ratings', async (req, res) => {
  try {
    const result = await pool.query('SELECT rating FROM reviews_ratings');
    res.json({rating: result.rows[0].rating});
  } catch (error) {
    console.error('Error retrieving rating:', error);
    res.status(500).json({ error: 'Error retrieving rating'});
  }
});

app.post('/api/likes', async (req, res) => {
  try {
    const updatedCount = req.body.count;
    await pool.query('UPDATE article_likes SET count = $1', [updatedCount]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating likes count:', error);
    res.status(500).json({ error: 'Error updating likes'});
  }
});

app.post('/api/ratings', async (req, res) => {
  try {
    const {rating} = req.body;
    await pool.query('UPDATE reviews_ratings SET rating = $1', [rating]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Error updating rating'});
  }
});
app.get('/rungame', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM games`);
  res.send(rows);
});

app.get('/login', async (req, res) => {'SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]
  res.send(rows);
})

app.get('/register', async (req, res) => {'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})