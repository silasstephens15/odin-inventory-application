const { pool } = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;");
  return rows;
}

async function getProductInCategory(category) {
  const { rows } = await pool.query(
    "SELECT parts.name, parts.price FROM categories JOIN parts on categories.id = parts.category_id WHERE categories.name = $1;",
    [category],
  );
  return rows;
}

module.exports = { getCategories, getProductInCategory };
