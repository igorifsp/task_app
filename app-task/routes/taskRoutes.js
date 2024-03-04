const express = require("express");
const router = express.Router();

// Importe o controlador apropriado para lidar com as solicitações
const taskController = require("../controllers/taskController");

// Defina a rota GET para obter todas as tarefas
router.get("/tasks", taskController.getAllTasks);

// Defina outras rotas, se necessário...

module.exports = router;
