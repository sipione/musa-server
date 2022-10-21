const { Router } = require("express");
const {UserController} = require("../controllers");
const {MiddlewareAuth} = require("../middlewares")

const router = Router();

router
    .get("/api/users",UserController.getAllProfessionalUsers)
    .get("/api/users/all", UserController.getAllUsers)
    .get("/api/users/total", UserController.getTotal)
    .get("/api/users/locations", UserController.getLocations)
    .get("/api/users/:id",UserController.getUserById)
    .post("/api/forgotpass",UserController.forgotPasswordEmail)
    .post("/api/changepass", UserController.changePassword)
    .post("/api/register", UserController.registerUser)
    .post("/api/login", UserController.loginUser)
    .put("/api/users/:id", UserController.updateUser)
    .delete("/api/users/:id", UserController.deleteUser)

module.exports = router