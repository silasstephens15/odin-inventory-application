const { Router } = require("express");
const {
  getCategories,
  getProductInCategory,
  getAllProducts,
} = require("../models/query");
const { addCategory, deleteCategory } = require("../models/update");

const categoryRouter = Router();

getCategories().then((categories) => {
  categories.map((category) => {
    categoryRouter.get("/" + category.name, (req, res) => {
      getProductInCategory(category.name).then((parts) => {
        res.render("browse", {
          title: category.name,
          parts,
          oneCategory: true,
          oneManufacturer: false,
        });
      });
    });
  });
  categoryRouter.get("/all", (req, res) => {
    getAllProducts().then((parts) => {
      res.render("browse", {
        title: "All",
        parts,
        oneCategory: false,
        oneManufacturer: false,
      });
    });
  });
  categoryRouter.get("/add", (req, res) => {
    res.render("add-category", { title: "Add Category", location: "category" });
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
categoryRouter.delete("/:name&:password", async (req, res, next) => {
  if (req.params.password != process.env.PASSWORD) {
    return new ForbiddenError("Incorrect Password");
  } else {
    await deleteCategory(req.params.name);
    res.json({ redirect: "/" });
  }
});

module.exports = { categoryRouter };
