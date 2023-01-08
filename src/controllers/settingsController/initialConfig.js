"use strict";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);

module.exports = (req, res) => {
  let settings = {
    host: req.body.host,
    database: req.body.database,
    username: req.body.username,
    password: req.body.password,
    port: parseInt(req.body.port, 10),
  };

  if (
    !settings.host ||
    !settings.database ||
    !settings.username ||
    !settings.password ||
    !settings.port
  ) {
    res.status(400).send({
      status: "error",
      message: "Não foi possível realizar a configuração",
    });
  } else {
    db.set("settings", settings).write();
    res.status(200).send({
      status: "success",
      message: "Configuração bem sucedida",
      payload: settings,
    });
  }
};
