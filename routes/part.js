const { Router } = require("express");
const { getCategories, getManufacturers } = require("../models/query");
const InternalServiceError = require("../error/internalServiceError");
const { addPart } = require("../models/update");

const partRouter = Router();

partRouter.get("/add", async (req, res, next) => {
  try {
    var categories = await getCategories();
    var manufacturers = await getManufacturers();
  } catch {
    next(new InternalServiceError("Database error"));
  }
  res.render("add-part", { title: "Add-Part", manufacturers, categories });
});
partRouter.post("/add", async (req, res, next) => {
  try {
    await addPart(
      req.body.name,
      req.body.price,
      req.body.category,
      req.body.manufacturer,
      req.body.password,
    );
    res.redirect("/");
  } catch {
    next(new InternalServiceError("Database error"));
  }
});

module.exports = { partRouter };
