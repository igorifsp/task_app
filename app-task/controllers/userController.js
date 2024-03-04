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
      const userData = req.body; // Obtém os dados do corpo da requisição
      const newUser = await userService.createUser(userData); // Chama o serviço para criar o usuário
      res.status(201).json(newUser); // Retorna o novo usuário criado
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna um erro em caso de falha na criação do usuário
    }
  },

  getUser: async (req, res) => {
    try {
      const email = req.params.email; // Obtém o email do usuário a ser buscado
      const user = await userService.getUser(email); // Chama o serviço para obter o usuário
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" }); // Retorna um erro se o usuário não for encontrado
      } else {
        res.status(200).json(user); // Retorna o usuário encontrado
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna um erro em caso de falha na busca do usuário
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers(); // Chama o serviço para obter todos os usuários
      res.status(200).json(users); // Retorna os usuários encontrados
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna um erro em caso de falha na busca dos usuários
    }
  },

  updateUser: async (req, res) => {
    try {
      const email = req.params.email; // Obtém o email do usuário a ser atualizado
      const userData = req.body; // Obtém os dados atualizados do corpo da requisição
      const updatedUser = await userService.updateUser(email, userData); // Chama o serviço para atualizar o usuário
      if (!updatedUser) {
        res.status(404).json({ message: "Usuário não encontrado" }); // Retorna um erro se o usuário não for encontrado
      } else {
        res.status(200).json(updatedUser); // Retorna o usuário atualizado
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna um erro em caso de falha na atualização do usuário
    }
  },

  deleteUser: async (req, res) => {
    try {
      const email = req.params.email; // Obtém o email do usuário a ser deletado
      const deletedUser = await userService.deleteUser(email); // Chama o serviço para deletar o usuário
      if (!deletedUser) {
        res.status(404).json({ message: "Usuário não encontrado" }); // Retorna um erro se o usuário não for encontrado
      } else {
        res.status(200).json({ message: "Usuário deletado com sucesso" }); // Retorna uma mensagem de sucesso se o usuário for deletado
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Retorna um erro em caso de falha na exclusão do usuário
    }
  },
};
