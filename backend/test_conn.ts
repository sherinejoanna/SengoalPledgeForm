import { PrismaClient } from '@prisma/client';

async function testConnection(name: string, url: string) {
  console.log(`\n--- Testing connection: ${name} ---`);
  console.log(`URL: ${url.replace(/:[^:@]+@/, ':****@')}`); // Hide password
  
  const prisma = new PrismaClient({
    datasources: {
      db: { url }
    }
  });

  try {
    const start = Date.now();
    // Simple query to test the connection
    const result = await prisma.$queryRaw`SELECT 1 as net_test`;
    console.log(`✅ Success! Response time: ${Date.now() - start}ms`);
    console.log(`Result:`, result);
    return true;
  } catch (error: any) {
    console.error(`❌ Failed!`);
    console.error(`Error Message: ${error.message || error}`);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const oldPassword = 'Seyon_Blr$$';
  const newPassword = 'SeyonBlr2026';
  const projectRef = 'ogrtlaoitthdflbyxldo';
  const region = 'aws-0-ap-south-1';
  
  // Test combinations
  const tests = [
    {
      name: 'Pooler (Port 6543) - New Password',
      url: `postgresql://postgres.${projectRef}:${newPassword}@${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`
    },
    {
      name: 'Session Pooler (Port 5432) - New Password',
      url: `postgresql://postgres.${projectRef}:${newPassword}@${region}.pooler.supabase.com:5432/postgres`
    },
    {
      name: 'Direct (Port 5432) - New Password',
      url: `postgresql://postgres:${newPassword}@db.${projectRef}.supabase.co:5432/postgres`
    },
    {
      name: 'Pooler (Port 6543) - Old Password',
      url: `postgresql://postgres.${projectRef}:${encodeURIComponent(oldPassword)}@${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`
    },
    {
      name: 'Session Pooler (Port 5432) - Old Password',
      url: `postgresql://postgres.${projectRef}:${encodeURIComponent(oldPassword)}@${region}.pooler.supabase.com:5432/postgres`
    },
    {
      name: 'Direct (Port 5432) - Old Password',
      url: `postgresql://postgres:${encodeURIComponent(oldPassword)}@db.${projectRef}.supabase.co:5432/postgres`
    }
  ];

  for (const t of tests) {
    await testConnection(t.name, t.url);
  }
}

main().catch(console.error);
