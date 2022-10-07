const { Router } = require("express");
const { CategoryController } = require("../controllers");

const routes = Router();

routes
    .get("/api/categories", CategoryController.getAllCategories)
    .post("/api/categories", CategoryController.CreateCategories)
module.exports = routes