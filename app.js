const express = require("express");
const { indexRouter } = require("./routes/index");
const path = require("node:path");
const { categoryRouter } = require("./routes/category");
const NotFoundError = require("./error/notFound");
const { partRouter } = require("./routes/part");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/part", partRouter);
app.use((req, res) => {
  throw new NotFoundError("404: Page not found");
  Next(err);
});
app.use((err, req, res, next) => {
  if (err.statusCode == null || err.statusCode == 500) {
    console.error(err);
  }
  res
    .status(err.statusCode || 500)
    .render("error", { title: "Error", message: err.message });
});

app.listen(3000);
