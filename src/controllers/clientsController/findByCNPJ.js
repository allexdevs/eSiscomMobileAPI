/*global process */
"use strict";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);
const { PrismaClient } = require("@prisma/client");

// helpers
const helpers = require("../../utils/helpers");

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
  let cnpj = req.params.cnpj;

  const findByCNPJ = async () => {
    const listOfCNPJ = await prisma.$queryRaw`SELECT CPF_CNPJ FROM clientes;`;

    const foundValue = listOfCNPJ.filter((item) => {
      return helpers.removeMask(item.CPF_CNPJ) === helpers.removeMask(cnpj)
        ? item.CPF_CNPJ
        : null;
    });

    if (foundValue.length <= 0) {
      res.status(404).send({
        status: "error",
        message: "Nenhum cliente encontrado com o CNPJ informado",
        params: {
          name: "cnpj",
          type: "string",
          value: cnpj,
        },
        payload: {},
      });
    } else {
      const foundCNPJ = await prisma.clientes.findFirst({
        where: {
          CPF_CNPJ: foundValue[0].CPF_CNPJ,
        },
      });

      res.status(200).send({
        status: "success",
        message: "Cliente encontrado com sucesso",
        params: {
          name: "cnpj",
          type: "string",
          value: cnpj,
        },
        payload: foundCNPJ,
      });
    }
  };

  findByCNPJ()
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
