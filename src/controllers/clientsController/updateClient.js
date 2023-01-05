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
  const updateCustomer = async () => {
    const customer = await prisma.clientes.update({
      where: {
        CODIGO: parseInt(req.params.id),
      },
      data: {
        NOME: req.body.nome,
        FANTASIA: req.body.fantasia,
        CPF_CNPJ: req.body.cpf_cnpj,
        RG_IE: req.body.rg_ie,
        RUA: req.body.rua,
        BAIRRO: req.body.bairro,
        CIDADE: req.body.cidade,
        ESTADO: req.body.estado,
        CEP: req.body.cep,
        COMPLEMENTO: req.body.complemento,
        NUMERO: parseInt(req.body.numero),
        OBS: req.body.obs,
        EMAIL: req.body.email,
        TELEFONE: req.body.telefone,
        STATUS: req.body.status,
        VLR_TOTAL_VENDAS: parseFloat(req.body.vlr_total_vendas),
      },
    });

    res.status(200).send({
      message: "Cliente atualizado com sucesso",
      payload: customer,
    });
  };
  updateCustomer()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
