import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.pledge.count();
  console.log('Total pledges in database:', count);
  
  const latest = await prisma.pledge.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      fullName: true,
      mobile: true,
      email: true,
      createdAt: true
    }
  });
  console.log('Latest 5 pledges:', JSON.stringify(latest, null, 2));
}

main()
  .catch(e => console.error('Database query failed:', e))
  .finally(() => prisma.$disconnect());
