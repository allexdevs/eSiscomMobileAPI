/*global process */
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  let host = req.query.host;

  const getAllCustomers = async () => {
    const allCustomers = await prisma.clientes.findMany();
    if (allCustomers.length <= 0) {
      res.status(200).send({
        message: "Nenhum cliente foi encontrado",
      });
    } else {
      res.status(200).send(allCustomers);
    }
  };

  getAllCustomers()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  console.log(host);
};
