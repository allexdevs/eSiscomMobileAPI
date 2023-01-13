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
  let furnisher = req.params.furnisher;

  const findProductsByFurnisher = async () => {
    const foundProducts = await prisma.produtos.findMany({
      where: {
        FORNECEDOR: parseInt(furnisher),
      },
    });

    if (foundProducts.length <= 0) {
      res.status(404).send({
        status: "error",
        params: {
          name: "furnisher",
          type: "number",
          value: parseInt(furnisher),
        },
        message: "Nenhum produto encontrado com o fornecedor informado",
        payload: [],
      });
    } else {
      res.status(200).send({
        status: "success",
        params: {
          name: "furnisher",
          type: "number",
          value: parseInt(furnisher),
        },
        message: "Produto(s) localizado(s) com sucesso",
        payload: foundProducts,
      });
    }
  };

  findProductsByFurnisher()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      res.status(500).send({
        status: "error",
        message: "Não foi possível concluir essa operação",
        error: e,
      });
      await prisma.$disconnect();
      process.exit(1);
    });
};
