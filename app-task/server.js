require("dotenv").config(); // Importando as variáveis de ambiente
const cors = require("cors");

// Importando as dependências necessárias
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes"); // Importando as rotas de usuário
const taskRoutes = require("./routes/taskRoutes"); // Importando as rotas de tarefa

// Inicializando o aplicativo Express
const app = express();

app.use(cors());

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Definindo as rotas para usuários e tarefas
app.use("", userRoutes);
app.use("", taskRoutes);

// Definindo uma rota padrão para verificar se o servidor está ativo
app.get("/", (req, res) => {
  res.send("Servidor Node.js com Express e MySQL está ativo!");
});

// Definindo a porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

// Iniciando o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
