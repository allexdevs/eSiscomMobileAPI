const express = require("express");
const app = express();
const port = 5200;
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// docs
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// storage local
db.defaults({ settings: {} }).write();

// routes
const login = require("./routes/login");
const client = require("./routes/clients");
const settings = require("./routes/settings");
const address = require("./routes/address");
const products = require("./routes/products");

app.use("/auth", login);
app.use("/clients", client);
app.use("/settings", settings);
app.use("/address", address);
app.use("/products", products);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
