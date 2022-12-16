const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  const allClients = await prisma.clientes.findMany();
  console.log(allClients);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
