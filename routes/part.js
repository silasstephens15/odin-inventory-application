const { Router } = require("express");
const { getCategories, getManufacturers } = require("../models/query");
const InternalServiceError = require("../error/internalServiceError");
const { addPart, updateAmount, deletePart } = require("../models/update");
const UnprocessableError = require("../error/unprocessableError");
const ForbiddenError = require("../error/forbidden");

const partRouter = Router();

partRouter.get("/add", async (req, res, next) => {
  try {
    var categories = await getCategories();
    var manufacturers = await getManufacturers();
  } catch (err) {
    next(err);
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
  } catch (err) {
    next(err);
  }
});
partRouter.post("/amount", async (req, res, next) => {
  const name = Object.keys(req.body).filter((item) => item != "password")[0];
  if (req.body[name] < 0) {
    return next(new UnprocessableError("422: Improperly formatted data."));
  }
  try {
    await updateAmount(name, req.body[name], req.body.password);
  } catch (err) {
    return next(err);
  }
  res.redirect(req.headers.referer);
});
partRouter.delete("/:name&:password", async (req, res, next) => {
  if (req.params.password != process.env.PASSWORD) {
    return next(new ForbiddenError("403: Incorrect password"));
  } else {
    deletePart(req.params.name);
    res.json({ redirect: req.headers.referer });
  }
});

module.exports = { partRouter };
