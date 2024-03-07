const userService = require("../services/userService");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmailAndPassword(email, password);
      if (!user) {
        res.status(401).json({ error: "Credenciais inválidas" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const email = req.params.email;
      const user = await userService.getUser(email);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const email = req.params.email;
      const userData = req.body;
      const updatedUser = await userService.updateUser(email, userData);
      if (!updatedUser) {
        res.status(404).json({ message: "Usuário não encontrado" });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const email = req.params.email;
      const deletedUser = await userService.deleteUser(email);
      if (!deletedUser) {
        res.status(404).json({ message: "Usuário não encontrado" });
      } else {
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
