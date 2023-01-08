/*global process */
"use strict";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);
const { PrismaClient } = require("@prisma/client");

const host = db.get("settings.host").value();
const database = db.get("settings.database").value();
const username = db.get("settings.username").value();
const password = db.get("settings.password").value();
const port = db.get("settings.port").value();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${username}:${password}@${host}:${port}/${database}`,
    },
  },
});

module.exports = async (req, res) => {
  const user = {
    username: req.query.username,
    password: req.query.password,
  };

  const checkUser = async () => {
    const userData = await prisma.vendedores.findFirst({
      where: {
        USUARIO: user.username,
        SENHA: user.password,
      },
    });

    if (!userData) {
      res.status(400).send({
        message: "Usuário ou senha incorretos",
        status: "error",
      });
    } else {
      res.status(200).send({
        message: "Login realizado com sucesso",
        status: "success",
        payload: userData,
      });
    }
  };

  checkUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
