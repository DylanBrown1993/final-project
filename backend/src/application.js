const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
// const fileUpload = require("express-fileupload");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

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
// app.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));

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
    const { rows } = await pool.query(`SELECT * FROM reviews, users WHERE reviews.id = $1`, [reviewId]); 
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
    const { rows } = await pool.query(`SELECT arts.id AS id, arts.title, arts.image, arts.time_stamp, arts.user_id, users.name, users.username, users.email FROM arts LEFT JOIN users ON arts.user_id = users.id WHERE arts.id = $1`, [artId])
    // const { rows } = await pool.query(`SELECT * FROM arts, users WHERE arts.id = $1 AND arts.user_id = users.id`, [artId]);
    
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
  console.log(articleId);
  try {
    const { rows } = await pool.query(`SELECT * FROM articles, users WHERE articles.id = $1`, [articleId]); 
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
    if (!result.rows.length) {
      count = 0;
    } else {
      count = result.rows[0].count;
    }
    res.json({likes: count});
  } catch (error) {
    console.error('Error retrieving likes count:', error);
    res.status(500).json({ error: 'Error retrieving likes'});
  }
});

app.get('/api/ratings', async (req, res) => {
  try {
    const reviewId = req.query.page;
    const result = await pool.query('SELECT rating FROM reviews_ratings WHERE reviews_id = $1', [reviewId]);
    if (!result.rows.length) {
      rating = 0;
    } else {
      rating = result.rows[0].rating;
    }
    res.json({rating: rating});
  } catch (error) {
    console.error('Error retrieving rating:', error);
    res.status(500).json({ error: 'Error retrieving rating'});
  }
});

app.post('/api/likes', async (req, res) => {
  try {
    const articleId = req.query.page;
    const updatedCount = req.body.count;
    console.log("updated:", updatedCount);
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

app.get('/api/artLikes', async (req, res) => {
  try {
    const artId = req.query.page;
    const result = await pool.query('SELECT "count" FROM arts_likes WHERE art_id = $1', [artId]);
    if (!result.rows.length) {
      count = 0;
    } else {
      count = result.rows[0].count;
    }
    res.json({likes: count});
  } catch (error) {
    console.error('Error retrieving likes count:', error);
    res.status(500).json({ error: 'Error retrieving likes'});
  }
});

app.post('/api/artLikes', async (req, res) => {
  try {
    const artId = req.query.page;
    const updatedCount = req.body.count;
    await pool.query('UPDATE arts_likes SET count = $1 WHERE art_id = $2', [updatedCount, artId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating likes count:', error);
    res.status(500).json({ error: 'Error updating likes'});
  }
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
    const { rows } = await pool.query(`SELECT * FROM forums JOIN users ON user_id = users.id WHERE forums.id = $1`, [forumId]);
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

app.post('/submitart', async (req, res) => {
  const { title, image} = req.body;
  const userId = req.session.user_id;
  const createArtId = Math.floor(Math.random()*100);
  try {
    await pool.query(`INSERT INTO arts (title, image, user_id, id) VALUES($1, $2, $3, $4) RETURNING *`, [title, image, userId, createArtId])
    await pool.query(`INSERT INTO arts_likes (count, art_id, user_id) VALUES ($1, $2, $3)`, [0, createArtId, userId])
    await pool.query(`SELECT username FROM users WHERE id = $1`, [userId]);
    res.status(200).json({success: 'Art successfully added'});
  } catch (error) {
    console.error("Error insert art submission in queries", error);
    res.status(500).json({ error: 'Internal server error'});
  };
});

app.post('/submitarticle', async (req, res) => {
  const { title, header_image, description, body } = req.body;
  const userId = req.session.user_id;
  const createArticleId = Math.floor(Math.random()*100);
  try {
    await pool.query(`INSERT INTO articles (title, header_image, description, body, user_id, id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [title, header_image, description, body, userId, createArticleId])
    await pool.query(`INSERT INTO article_likes (count, article_id, user_id) VALUES ($1, $2, $3)`, [0, createArticleId, userId])
    await pool.query(`SELECT username FROM users WHERE id = $1`, [userId]);
    res.status(200).json({success: 'Article successfully added'});
  } catch (error) {
    console.error("Error insert article submission in queries", error);
    res.status(500).json({ error: 'Internal server error'});
  };
});

app.post('/submitreview', async (req, res) => {
  const { title, description, body} = req.body;
  const userId = req.session.user_id;
  try {
    const reviewInsert = await pool.query(`INSERT INTO reviews (title, description, body, user_id) VALUES($1, $2, $3, $4) RETURNING id`, [title, description, body, userId])
    await pool.query(`INSERT INTO reviews_ratings (rating, reviews_id, user_id) VALUES ($1, $2, $3)`, [0, reviewInsert.rows[0].id, userId])
    await pool.query(`SELECT username FROM users WHERE id = $1`, [userId]);
    res.status(200).json({success: 'Review successfully added'});
  } catch (error) {
    console.error("Error insert review submission in queries", error);
    res.status(500).json({ error: 'Internal server error'});
  };
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})