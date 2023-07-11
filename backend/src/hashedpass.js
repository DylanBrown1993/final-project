const bcrypt = require("bcrypt");

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "labber",
  port: 5432,
  password: "123",
  database: "final",
});

pool.connect();

const update = async () => {
  // const { rows } = await pool.query(`SELECT * FROM users WHERE id = 9`);

  const hashedPassword = bcrypt.hashSync("asdfg", 5);
  await pool.query(`UPDATE users SET password = $1 WHERE id = 9`, [hashedPassword]);
}

update();