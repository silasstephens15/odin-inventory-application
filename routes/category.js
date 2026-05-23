const { Router } = require("express");
const {
  getCategories,
  getProductInCategory,
  getAllProducts,
} = require("../models/query");
const { addCategory } = require("../models/update");

const categoryRouter = Router();

getCategories().then((categories) => {
  categories.map((category) => {
    categoryRouter.get("/" + category.name, (req, res) => {
      getProductInCategory(category.name).then((parts) => {
        res.render("category", {
          title: category.name,
          parts,
          oneCategory: true,
        });
      });
    });
  });
  categoryRouter.get("/all", (req, res) => {
    getAllProducts().then((parts) => {
      res.render("category", { title: "All", parts, oneCategory: false });
    });
  });
  categoryRouter.get("/add", (req, res) => {
    res.render("add-category", { title: "Add Category" });
  });
  categoryRouter.post("/add", (req, res, next) => {
    addCategory(req.body.name, req.body.password)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = { categoryRouter };
