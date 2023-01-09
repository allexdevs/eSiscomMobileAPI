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
  let requestBody = req.body;
  const checkedValues = helpers.checkEmptyValues(requestBody, [
    "obs_pedido",
    "obs_nfe",
    "perc_desconto",
    "vlr_desconto",
    "perc_acrescimo",
    "vlr_acrescimo",
  ]);
  const addNewRequest = async () => {
    if (checkedValues.length > 0) {
      res.status(400).send({
        status: "error",
        message: "A requisição possui valores vazios",
        payload: checkedValues,
      });
    } else {
      let lastId = prisma.$queryRaw`SELECT MAX(CODIGO) as 'value' FROM pedido;`;
      const request = await prisma.pedido.create({
        data: {
          CODIGO: parseInt(lastId[0].value + 1, 10),
          DATA: req.body.data,
          HORA: req.body.hora,
          CLIENTE: req.body.cliente,
          VENDEDOR: req.body.vendedor,
          OBS_PEDIDO: req.body.obs_pedido,
          OBS_NFE: req.body.obs_nfe,
          VLR_PRODUTOS: req.body.vlr_produtos,
          PERC_DESCONTO: req.body.perc_desconto,
          VLR_DESCONTO: req.body.vlr_desconto,
          PERC_ACRESCIMO: req.body.perc_acrescimo,
          VLR_ACRESCIMO: req.body.vlr_acrescimo,
          VLR_TOTAL: req.body.vlr_total,
        },
      });

      res.status(201).send({
        status: "success",
        message: "Pedido adicionado com sucesso",
        payload: request,
      });
    }
  };

  addNewRequest()
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
