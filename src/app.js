const express = require("express");
const app = express();
const port = 5200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const client = require("./routes/clients");

app.use("/clients", client);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
