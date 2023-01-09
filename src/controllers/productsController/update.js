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
  let id = req.params.id;
  let params = req.body;

  const updateProduct = async () => {
    const product = await prisma.produtos.update({
      where: {
        CODIGO: parseInt(id),
      },
      data: {
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
      },
    });

    res.status(200).send({
      status: "success",
      params: {
        name: "id",
        type: "number",
        value: parseInt(id),
      },
      message: "Produto atualizado com sucesso",
      payload: product,
    });
  };

  updateProduct()
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
