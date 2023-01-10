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
  let cpf = req.params.cpf;

  const findByCPF = async () => {
    const listOfCPF = await prisma.$queryRaw`SELECT CPF_CNPJ FROM clientes;`;

    const foundValue = listOfCPF.filter((item) => {
      return helpers.removeMask(item.CPF_CNPJ) === helpers.removeMask(cpf)
        ? item.CPF_CNPJ
        : null;
    });

    if (foundValue.length <= 0) {
      res.status(404).send({
        status: "error",
        message: "Nenhum cliente encontrado com o CPF informado",
        params: {
          name: "cpf",
          type: "string",
          value: cpf,
        },
        payload: {},
      });
    } else {
      const foundCPF = await prisma.clientes.findFirst({
        where: {
          CPF_CNPJ: foundValue[0].CPF_CNPJ,
        },
      });

      res.status(200).send({
        status: "success",
        message: "Cliente encontrado com sucesso",
        params: {
          name: "cpf",
          type: "string",
          value: cpf,
        },
        payload: foundCPF,
      });
    }
  };

  findByCPF()
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
