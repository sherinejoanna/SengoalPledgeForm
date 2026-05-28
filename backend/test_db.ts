import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Get all table names
  const tables: any = await prisma.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `;
  console.log('Tables in database:', tables);

  // Get columns for any table containing 'test'
  const testTables = tables.filter((t: any) => t.table_name.toLowerCase().includes('test'));
  for (const t of testTables) {
    const columns: any = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = '${t.table_name}' AND table_schema = 'public'
    `);
    console.log(`Columns for table "${t.table_name}":`, columns);
  }
}

main()
  .catch(e => console.error('Database query failed:', e))
  .finally(() => prisma.$disconnect());
