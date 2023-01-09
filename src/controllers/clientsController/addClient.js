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
  if (
    !req.body.nome ||
    !req.body.fantasia ||
    !req.body.cpf_cnpj ||
    !req.body.rg_ie ||
    !req.body.rua ||
    !req.body.bairro ||
    !req.body.cidade ||
    !req.body.estado ||
    !req.body.cep ||
    req.body.numero === "" ||
    !req.body.telefone
  ) {
    res.status(400).send({
      status: "error",
      payload: {
        nome: req.body.nome,
        fantasia: req.body.fantasia,
        cpf_cnpj: req.body.cpf_cnpj,
        rg_ie: req.body.rg_ie,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
        numero: req.body.numero,
        telefone: req.body.telefone,
      },
      error: "A requisição possui campos em branco",
    });
  } else {
    const getLstId = async () => {
      let lastId =
        await prisma.$queryRaw`SELECT MAX(CODIGO) as 'value' FROM clientes;`;

      const customerData = {
        CODIGO: parseInt(lastId[0].value + 1, 10),
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
      };

      const addNewCustomer = async () => {
        const newCustomer = await prisma.clientes.create({
          data: customerData,
        });

        res.status(201).send({
          message: "Cliente salvo com sucesso",
          payload: newCustomer,
        });
      };

      addNewCustomer()
        .then(async () => {
          await prisma.$disconnect();
        })
        .catch(async (e) => {
          console.error(e);
          await prisma.$disconnect();
          process.exit(1);
        });
    };
    getLstId()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
};
