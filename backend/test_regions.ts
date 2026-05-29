import { PrismaClient } from '@prisma/client';
async function test() {
  const regions = ['ap-south-1', 'ap-southeast-1', 'us-east-1', 'eu-west-1', 'us-west-1', 'eu-central-1'];
  for (const r of regions) {
    const url = 'postgresql://postgres.ogrtlaoitthdflbyxldo:SeyonBlr2026@aws-0-'+r+'.pooler.supabase.com:6543/postgres?pgbouncer=true';
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✅ Connected to ' + r);
      return;
    } catch(e: any) {
      console.log('❌ ' + r + ' failed: ' + (e.message || e).split('\n').pop());
    } finally {
      await prisma.$disconnect();
    }
  }
}
test();
