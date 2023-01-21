/*global process */
"use strict";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/db.json");
const db = low(adapter);
const { PrismaClient } = require("@prisma/client");
const moment = require("moment");

// helpers
const { createDate, createTime } = require("../../utils/helpers");

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
  let requestBody = req.body;

  const addNewRequest = async () => {
    if (
      !requestBody.cliente ||
      !requestBody.vendedor ||
      !requestBody.vlr_produtos ||
      !requestBody.vlr_total
    ) {
      res.status(400).send({
        status: "error",
        message: "A requisição possui valores vazios",
        payload: [
          { field: "cliente", value: requestBody.cliente },
          { field: "vendedor", value: requestBody.vendedor },
          { field: "vlr_produtos", value: requestBody.vlr_produtos },
          { field: "vlr_total", value: requestBody.vlr_total },
        ],
      });
    } else {
      let lastId =
        await prisma.$queryRaw`SELECT MAX(CODIGO) as 'value' FROM pedido;`;
      let date = createDate();
      let time = createTime();
      const request = await prisma.pedido.create({
        data: {
          CODIGO: parseInt(lastId[0].value + 1, 10),
          DATA: date,
          HORA: moment(time).subtract("hours", 3)._d,
          CLIENTE: parseInt(requestBody.cliente),
          VENDEDOR: parseInt(requestBody.vendedor),
          OBS_PEDIDO: requestBody.obs_pedido,
          OBS_NFE: requestBody.obs_nfe,
          VLR_PRODUTOS: parseFloat(requestBody.vlr_produtos),
          PERC_DESCONTO: parseFloat(requestBody.perc_desconto),
          VLR_DESCONTO: parseFloat(requestBody.vlr_desconto),
          PERC_ACRESCIMO: parseFloat(requestBody.perc_acrescimo),
          VLR_ACRESCIMO: parseFloat(requestBody.vlr_acrescimo),
          VLR_TOTAL: parseFloat(requestBody.vlr_total),
        },
      });

      console.log("Data:", date);
      console.log("Hora:", time);

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
      console.log(e);
      res.status(500).send({
        status: "error",
        message: "Não foi possível concluir essa operação",
        error: e,
      });
      await prisma.$disconnect();
      process.exit(1);
    });
};
