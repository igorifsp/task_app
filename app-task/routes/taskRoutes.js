const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/tasks/:emailUser", taskController.getUserTasks);
router.post("/tasks", taskController.createTask);
router.put(`/tasks/:idTask`, taskController.updateTask);
router.delete("/tasks/:idTask", taskController.deleteTask);

module.exports = router;
