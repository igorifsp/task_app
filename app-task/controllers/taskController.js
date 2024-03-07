const taskService = require("../services/taskService");

module.exports = {
  createTask: async (req, res) => {
    try {
      const taskData = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserTasks: async (req, res) => {
    try {
      const emailUser = req.params.emailUser;
      const tasks = await taskService.getUserTasks(emailUser);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = req.params.idTask;
      const updatedTaskData = req.body;
      const updatedTask = await taskService.updateTask(taskId, updatedTaskData);
      console.log(updatedTask);
      if (!updatedTask) {
        res.status(404).json({ message: "Tarefa não encontrada" });
        return;
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.idTask;
      await taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
