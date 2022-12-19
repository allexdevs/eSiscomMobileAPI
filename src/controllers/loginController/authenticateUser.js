/* global process */
"use strict";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const checkUser = async () => {
    const userData = await prisma.vendedores.findFirst({
      where: {
        USUARIO: user.username,
        SENHA: user.password,
      },
    });

    if (!userData) {
      res.status(404).send({
        message: "Usuário ou senha incorretos",
        status: "error",
      });
    } else {
      res.status(200).send({
        message: "Login realizado com sucesso",
        status: "success",
        payload: userData
      });
    }
  };

  checkUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
