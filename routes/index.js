const { Router } = require("express");
const { getCategories, getManufacturers } = require("../models/query");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const categories = await getCategories();
  const manufacturers = await getManufacturers();
  res.render("index", { title: "Home", categories, manufacturers });
});

module.exports = { indexRouter };
