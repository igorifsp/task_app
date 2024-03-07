require("dotenv").config();
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("", userRoutes);
app.use("", taskRoutes);

app.get("/", (req, res) => {
  res.send("Servidor Node.js com Express e MySQL está ativo!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
