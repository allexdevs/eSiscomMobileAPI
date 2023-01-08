/* eslint-disable no-unused-vars */
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

    res.status(200).send({
      status: "success",
      message: "Cliente excluído com sucesso",
      params: {
        name: "id",
        type: "number",
        value: id,
      },
      payload: customer,
    });
  };

  deleteCustomer()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      process.exit(1);
    });
};
