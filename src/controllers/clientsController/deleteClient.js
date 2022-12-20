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
  let id = parseInt(req.params.id);

  const deleteCustomer = async () => {
    const customer = await prisma.clientes.delete({
      where: {
        CODIGO: id,
      },
    });

    if (!customer) {
      res.status(404).send({
        message: "Nenhum cliente encontrado com o id informado",
      });
    } else {
      res.status(200).send({
        message: "Cliente excluído com sucesso",
        payload: customer,
      });
    }
  };

  deleteCustomer()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
