/*global process */
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  let id = parseInt(req.params.id);

  const deleteCustomer = async () => {
    const customer = await prisma.clientes.delete({
      where: {
        CODIGO: id,
      },
    });

    if (!customer) {
      res.status(404).send({
        message: "Nenhum cliente encontrado com o id informado",
      });
    } else {
      res.status(200).send({
        message: "Cliente excluído com sucesso",
        payload: customer,
      });
    }
  };

  deleteCustomer()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
