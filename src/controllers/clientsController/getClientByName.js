/* global process */
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
  let customerName = req.params.name;

  const getCustomerByName = async () => {
    const customer = await prisma.clientes.findFirst({
      where: {
        NOME: customerName,
      },
    });

    if (!customer) {
      res.status(404).send({
        status: "error",
        message: "Nenhum cliente com esse nome foi encontrado",
        payload: customerName,
      });
    } else {
      res.status(404).send({
        status: "success",
        message: "Cliente localizado com sucesso",
        payload: customer,
      });
    }
  };

  getCustomerByName()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.log(error);
      await prisma.$disconnect();
      process.exit(1);
    });
};
