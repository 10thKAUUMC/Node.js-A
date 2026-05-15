import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    { id: 1, name: '한식' },
    { id: 2, name: '양식' },
    { id: 3, name: '일식' },
    { id: 4, name: '중식' },
    { id: 5, name: '분식' },
    { id: 6, name: '카페/디저트' },
  ];

  for (const category of categories) {
    await prisma.foodCategory.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  const stores = [
    { id: 1, name: '맛있는 한식집' },
    { id: 2, name: '분위기 좋은 양식집' },
  ];

  for (const store of stores) {
    await prisma.store.upsert({
      where: { id: store.id },
      update: {},
      create: store,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
