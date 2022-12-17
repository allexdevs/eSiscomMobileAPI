/*global process */
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  let id = parseInt(req.params.id);

  const getCustomerById = async () => {
    const customer = await prisma.clientes.findUnique({
      where: {
        CODIGO: id,
      },
    });

    if (!customer) {
      res.status(404).send({
        message: "Nenhum cliente com o id fornecido foi encontrado",
      });
    } else {
      res.status(200).send(customer);
    }
  };

  getCustomerById()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
