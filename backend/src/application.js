const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const app = express()
const port = 3001
// const db = require("./db")

app.use(cookieSession ({
  name: "session",
  keys: ['abc']
}));

const pool = new Pool({
  host: "localhost",
  user: "labber",
  port: 5432,
  password: "labber",
  database: "final",
});

pool.connect();

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const userAuth = (req, res, next) => {

  const userid = req.session.user_id;
  if (!userid) {
    res.status(401).json({ error: "Must first log in" });
    return;
  }
  next();
}


app.get('/', (req, res) => {
  res.json({message:"hello!"})
})

app.get('/users', userAuth, async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM users`);
  res.send(rows)
})

app.get('/users/info', userAuth, async (req, res) => {
  const userid = req.session.user_id;
  const { rows } = await pool.query(`SELECT email, name, id FROM users WHERE id = $1`, [userid]);
  res.json(rows[0])
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
    const { rows } = await pool.query(`SELECT * FROM reviews, users WHERE reviews.id = $1 AND reviews.user_id = users.id`, [reviewId]); 
    if (rows.length === 0) {
      return res.status(404).json({error: 'Review Not Found'});
    }
    res.json(rows[0]);
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

app.get('/art', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM arts`);
  res.send(rows)
})

app.get('/art/:id', async (req, res) => {
  const artId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT * FROM arts WHERE id = $1`, [artId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Art Not Found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/articles', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM articles`);
  res.send(rows)
})

app.get('/article/:id', async (req, res) => {
  const articleId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT * FROM articles, users WHERE articles.id = $1 AND articles.user_id = users.id`, [articleId]); 
    if (rows.length === 0) {
      return res.status(404).json({error: 'Article Not Found'});
    }
    res.json(rows[0]);
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

app.get('/art', async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM arts`);
  res.send(rows)
});

app.get('/art/:id', async (req, res) => {
  const artId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT * FROM arts WHERE id = $1`, [artId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Art Not Found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/likes', async (req, res) => {
  try {
    const articleId = req.query.page;
    const result = await pool.query('SELECT "count" FROM article_likes WHERE article_id = $1', [articleId]);
    res.json({likes: result.rows[0].count});
  } catch (error) {
    console.error('Error retrieving likes count:', error);
    res.status(500).json({ error: 'Error retrieving likes'});
  }
});

app.get('/api/ratings', async (req, res) => {
  try {
    const reviewId = req.query.page;
    const result = await pool.query('SELECT rating FROM reviews_ratings WHERE reviews_id = $1', [reviewId]);
    res.json({rating: result.rows[0].rating});
  } catch (error) {
    console.error('Error retrieving rating:', error);
    res.status(500).json({ error: 'Error retrieving rating'});
  }
});

app.post('/api/likes', async (req, res) => {
  try {
    const articleId = req.query.page;
    const updatedCount = req.body.count;
    await pool.query('UPDATE article_likes SET count = $1 WHERE article_id = $2', [updatedCount, articleId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating likes count:', error);
    res.status(500).json({ error: 'Error updating likes'});
  }
});

app.post('/api/ratings', async (req, res) => {
  try {
    const reviewId = req.query.page;
    const {rating} = req.body;
    await pool.query('UPDATE reviews_ratings SET rating = $1 WHERE reviews_id = $2', [rating, reviewId]);
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

app.get('/forums', async (req, res) => {
  const { rows } = await pool.query(`SELECT forums.id AS id, title, body, user_id, username, time_stamp FROM forums JOIN users ON user_id = users.id ORDER BY time_stamp DESC`);
  res.send(rows)
});

app.post('/forums', async (req, res) => {
  const { title, body } = req.body;
  const userId = req.session.user_id;
  console.log("testing", req.session.user_id)

  try {
    const { rows } = await pool.query(`INSERT INTO forums (title, body, user_id) VALUES ($1, $2, $3) RETURNING *`, [title, body, userId]);
    res.redirect('/forums');
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

app.get('/forums/:id', async (req, res) => {
  const forumId = req.params.id;
  console.log("another test", forumId);

  try {
    const { rows } = await pool.query(`SELECT * FROM forums WHERE id = $1`, [forumId]);
    console.log("rows here", rows)
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Forum Not Found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/forums/:id/comments', async (req, res) => {
  const forumId = req.params.id;
  const body = req.body.comment;
  console.log("body", req.body);
  const time_stamp = new Date();
  const userId = req.session.user_id;

  try {
    const { rows } = await pool.query(`INSERT INTO forum_comments (body, time_stamp, forum_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`, [body, time_stamp, forumId, userId]);
    res.send();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

app.get('/forums/:id/comments', async (req, res) => {
  const forumId = req.params.id;

  try {
    const { rows } = await pool.query(`SELECT username, forum_comments.* FROM forum_comments JOIN users ON user_id = users.id WHERE forum_id = $1 ORDER BY time_stamp DESC`, [forumId]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]); 
    if (rows.length === 0) {
      return res.status(401).json({error: 'Invalid email or password'});
    }

    const user = rows[0];

    // const passwordValid = password === user.password;
    const passwordValid = bcrypt.compareSync(password, user.password);
    console.log(passwordValid);
    console.log(user);
    console.log(password);
    if (!passwordValid) {
      return res.status(401).json({error: 'Invalid email or password'});
    }

    req.session.user_id = rows[0].id;
    res.json({
      message: 'Login successful',
      user: {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email
      }
    });
  } catch (error) {
      console.error('Error executing login query', error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.json({ message: 'Logout successful'});
});

app.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log("req here", req.body);

  try {

    const hashedPassword = bcrypt.hashSync(password, 5);
    const { rows } = await pool.query('INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [name, username, email, hashedPassword]);
    console.log("rows here", rows);
    req.session.user_id = rows[0].id;
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email
      }
    });
  } catch (error) {
    console.error('Error executing register query', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})