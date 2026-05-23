const { Router } = require("express");
const { getCategories, getManufacturers } = require("../models/query");
const InternalServiceError = require("../error/internalServiceError");

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

module.exports = { partRouter };
