const { Router } = require("express");
const {UserController} = require("../controllers");
const {MiddlewareAuth} = require("../middlewares")

const router = Router();

router
    .get("/users", [MiddlewareAuth.validateJWT], UserController.getAllProfessionalUsers)
    .get("/users/all", UserController.getAllUsers)
    .get("/users/:id",UserController.getUserById)
    .post("/register", UserController.registerUser)
    .post("/login", UserController.loginUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)

module.exports = router