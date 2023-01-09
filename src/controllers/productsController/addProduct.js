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

// helpers
const helpers = require("../../utils/helpers");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://${username}:${password}@${host}:${port}/${database}`,
    },
  },
});

module.exports = async (req, res) => {
  let params = req.body;
  if (!params.nome || !params.vlr_venda || !params.estoque) {
    res.status(400).send({
      status: "error",
      message: "A requisição possui valores vazios",
      payload: {
        nome: params.nome,
        vlr_venda: params.vlr_venda,
        estoque: params.estoque,
      },
    });
  } else {
    const addNewProduct = async () => {
      let lastId =
        await prisma.$queryRaw`SELECT MAX(CODIGO) as 'value' FROM produtos;`;
      const product = {
        CODIGO: parseInt(lastId[0].value + 1, 10),
        NOME: helpers.upperCase(params.nome),
        UNIDADE: helpers.upperCase(params.unidade),
        VLR_VENDA: parseFloat(params.vlr_venda),
        ESTOQUE: parseFloat(params.estoque),
        GRUPO: parseInt(params.grupo),
        GRUPO_NOME: helpers.upperCase(params.grupo_nome),
        SUBGRUPO: parseInt(params.subgrupo),
        SUBGRUPO_NOME: helpers.upperCase(params.subgrupo_nome),
        MARCA: parseInt(params.marca),
        MARCA_NOME: helpers.upperCase(params.marca_nome),
        FORNECEDOR: parseInt(params.fornecedor),
        FORNECEDOR_NOME: helpers.upperCase(params.fornecedor_nome),
      };
      const newProduct = await prisma.produtos.create({
        data: product,
      });
      res.status(201).send({
        status: "success",
        message: "Produto adicionado com sucesso",
        payload: newProduct,
      });
    };

    addNewProduct()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        // res.status(500).send({
        //   status: "error",
        //   message: "Não foi possível concluir essa operação",
        //   error: e,
        // });
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
};
