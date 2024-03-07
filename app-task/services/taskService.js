require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

// Importação do banco de dados
const { getTask } = require("../controllers/taskController");
const db = require("../dbConfig");

// Função para criar uma nova tarefa
module.exports = {
  createTask: async (taskData) => {
    const { title, description, isCompleted, emailUser } = taskData;
    const query =
      "INSERT INTO tasks (title, description, isCompleted, emailUser) VALUES (?, ?, ?, ?)";
    const values = [title, description, isCompleted, emailUser];
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            idTask: results.insertId,
            title,
            description,
            isCompleted,
            emailUser,
          });
        }
      });
    });
  },

  getUserTasks: async (emailUser) => {
    const query = "SELECT * FROM tasks WHERE emailUser = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [emailUser], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Função para atualizar uma tarefa existente
  updateTask: async (id, taskData) => {
    const { title, description, isCompleted, emailUser } = taskData;
    const query =
      "UPDATE tasks SET title = ?, description = ?, isCompleted = ?, emailUser = ? WHERE idTask = ?";
    const values = [title, description, isCompleted, emailUser, id];
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ idTask: id, title, description, isCompleted, emailUser });
          }
        }
      });
    });
  },

  // Função para deletar uma tarefa existente
  deleteTask: async (id) => {
    const query = "DELETE FROM tasks WHERE idTask = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows === 0) {
            resolve(null);
          } else {
            resolve({ idTask: id });
          }
        }
      });
    });
  },
};
