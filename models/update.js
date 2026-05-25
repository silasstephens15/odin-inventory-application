const ForbiddenError = require("../error/forbidden");
const InternalServiceError = require("../error/internalServiceError");
const { pool } = require("./pool");

async function addCategory(name, password) {
  if (password == process.env.PASSWORD) {
    await pool.query("INSERT INTO categories (name) VALUES ($1);", [name]);
  } else {
    throw new ForbiddenError("403: Forbidden. Incorrect Password");
  }
}

async function addManufacturer(name, password) {
  if (password == process.env.PASSWORD) {
    await pool.query("INSERT INTO manufacturers (name) VALUES ($1);", [name]);
  } else {
    throw new ForbiddenError("403: Forbidden. Incorrect Password");
  }
}

async function addPart(name, price, category, manufacturer, password) {
  if (password == process.env.PASSWORD) {
    try {
      await pool.query(
        `INSERT INTO parts (name, price, category_id, manufacturer_id)
        VALUES ($1, $2,
        (SELECT id FROM categories WHERE name = $3),
        (SELECT id FROM manufacturers WHERE name = $4));`,
        [name, price, category, manufacturer],
      );
    } catch {
      throw new InternalServiceError(
        "500: Internal Service Error. Database Error",
      );
    }
  } else {
    throw new ForbiddenError("403: Forbidden. Incorrect Password");
  }
}

async function updateAmount(name, amount, password) {
  if (password == process.env.PASSWORD) {
    try {
      await pool.query("UPDATE parts SET amount = $1 WHERE name = $2", [
        amount,
        name,
      ]);
    } catch {
      throw new InternalServiceError(
        "500: Internal Service Error. Database Error",
      );
    }
  } else {
    throw new ForbiddenError("403: Forbidden. Incorrect Password");
  }
}

module.exports = { addCategory, addPart, addManufacturer, updateAmount };
