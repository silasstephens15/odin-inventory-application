const { Router } = require("express");
const {
  getCategories,
  getProductInCategory,
  getAllProducts,
} = require("../models/query");

const categoryRouter = Router();

getCategories().then((categories) => {
  categories.map((category) => {
    categoryRouter.get("/" + category.name, (req, res) => {
      getProductInCategory(category.name).then((parts) => {
        res.render("category", { title: category.name, parts });
      });
    });
  });
  categoryRouter.get("/all", (req, res) => {
    getAllProducts().then((parts) => {
      res.render("category", { title: "All", parts });
    });
  });
});

module.exports = { categoryRouter };
