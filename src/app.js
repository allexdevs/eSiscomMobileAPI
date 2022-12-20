const express = require("express");
const app = express();
const port = 5200;
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// storage local
db.defaults({ settings: {} }).write();

// routes
const login = require("./routes/login");
const client = require("./routes/clients");
const settings = require("./routes/settings");

app.use("/auth", login);
app.use("/clients", client);
app.use("/settings", settings);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
