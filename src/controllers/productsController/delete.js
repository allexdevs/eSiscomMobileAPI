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
  let id = req.params.id;

  const deleteProduct = async () => {
    const deletedProduct = await prisma.produtos.delete({
      where: {
        CODIGO: parseInt(id),
      },
    });

    res.status(200).send({
      status: "success",
      message: "Produto excluído com sucesso",
      params: {
        name: "id",
        type: "number",
        value: parseInt(id),
      },
      payload: deletedProduct,
    });
  };

  deleteProduct()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.status(500).send({
        status: "error",
        message: "Não foi possívele concluir essa operação",
        error: e,
      });
      await prisma.$disconnect();
      process.exit(1);
    });
};
