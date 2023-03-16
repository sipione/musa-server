const { Router } = require("express");
const {UserController} = require("../controllers");
const {MiddlewareAuth} = require("../middlewares")

const router = Router();

router
    .get("/api/users",UserController.getAllProfessionalUsers)
    .post("/api/users/hirer",UserController.getNoProfessionalUsers)
    .post("/api/users/all", UserController.getAllUsers)
    .post("/api/users/all/total", UserController.getTotalOfUsers)
    .get("/api/users/total", UserController.getTotalOfProfessionals)
    .get("/api/users/locations", UserController.getLocations)
    .get("/api/users/:id",UserController.getUserById)
    .post("/api/forgotpass",UserController.forgotPasswordEmail)
    .post("/api/changepass", UserController.changePassword)
    .post("/api/register", UserController.registerUser)
    .post("/api/login", UserController.loginUser)

module.exports = router