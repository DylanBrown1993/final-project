const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express()
const port = 3001
const db = require("./db")

const client = new Client({
  host: "localhost",
  user: "labber",
  port: 5432,
  password: "123",
  database: "final",
});

client.connect();

app.use(cors());


app.get('/', (req, res) => {
  res.json({message:"hello!"})
})

app.get('/users', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM users`);
  res.send(rows)
})

app.get('/reviews', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM reviews`);
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

app.get('/rungame', async (req, res) => {
  const { rows } = await client.query(`SELECT * FROM games`);
  res.send(rows);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})