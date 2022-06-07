import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// mock users

const user1 = {
  email: "correct@email.com"
}

async function main() {

  await prisma.pending_Invites.create({
    data: {
      invite_email: user1.email
    },
  });

}

main().catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
