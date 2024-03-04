const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);
router.post("/users", userController.createUser);
router.get("/users/:email", userController.getUser);
router.get("/users", userController.getAllUsers);
router.put("/users/:email", userController.updateUser);
router.delete("/users/:email", userController.deleteUser);

module.exports = router;
