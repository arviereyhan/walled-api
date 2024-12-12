const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controllers");

router.post("/users", userController.createUsers);
router.get("/users", userController.getUsers);
router.post("/login", userController.login);

module.exports = router;