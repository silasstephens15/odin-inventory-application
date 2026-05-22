const ForbiddenError = require("../error/forbidden");
const { pool } = require("./pool");

async function addCategory(name, password) {
  if (password == process.env.PASSWORD) {
    await pool.query("INSERT INTO categories (name) VALUES ($1);", [name]);
  } else {
    throw new ForbiddenError("403: Forbidden. Incorrect Password");
  }
}

module.exports = { addCategory };
