const { pool } = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;");
  return rows;
}

async function getManufacturers() {
  const { rows } = await pool.query("SELECT * FROM manufacturers;");
  return rows;
}

async function getProductInCategory(category) {
  const { rows } = await pool.query(
    `SELECT parts.name, parts.price, categories.name AS category_name, manufacturers.name AS manufacturer_name 
    FROM categories 
    JOIN parts on categories.id = parts.category_id 
    JOIN manufacturers on manufacturers.id = parts.manufacturer_id
    WHERE categories.name = $1;`,
    [category],
  );
  return rows;
}

async function getProductInManufacturer(manufacturer) {
  const { rows } = await pool.query(
    `SELECT parts.name, parts.price, categories.name AS category_name, manufacturers.name AS manufacturer_name 
    FROM categories 
    JOIN parts on categories.id = parts.category_id 
    JOIN manufacturers on manufacturers.id = parts.manufacturer_id
    WHERE manufacturers.name = $1;`,
    [manufacturer],
  );
  return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query(
    `SELECT parts.price, parts.name, categories.name AS category_name, manufacturers.name AS manufacturer_name 
     FROM categories
     JOIN parts on categories.id = parts.category_id
     JOIN manufacturers on manufacturers.id = parts.manufacturer_id;`,
  );
  return rows;
}

module.exports = {
  getCategories,
  getProductInCategory,
  getAllProducts,
  getManufacturers,
  getProductInManufacturer,
};
