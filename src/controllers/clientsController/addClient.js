/*global process */
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    !req.body.numero ||
    !req.body.telefone
  ) {
    res.status(400).send({
      message: "A requisição possui campos em branco",
    });
  } else {
    const getLstId = async () => {
      let lastId = 0;
      let count = await prisma.clientes.count();
      lastId = parseInt(count + 1);
      console.log(lastId);

      const customerData = {
        CODIGO: lastId,
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
