import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seedSuperAdmin = async () => {
  const organizationEmail = 'admin@inventory.com';
  const adminEmail = 'superadmin@inventory.com';
  const password = '123456';

  const hashedPassword = await bcrypt.hash(password, 10);

  const organization = await prisma.organization.upsert({
    where: {
      slug: 'main-organization',
    },

    update: {},

    create: {
      name: 'Main Organization',
      slug: 'main-organization',
      email: organizationEmail,
      phone: '+8801712345678',
      address: 'Dhaka, Bangladesh',
      isActive: true,

      users: {
        create: {
          name: 'Super Admin',
          email: adminEmail,
          password: hashedPassword,
          role: Role.SUPER_ADMIN,
          isActive: true,
        },
      },
    },

    include: {
      users: true,
    },
  });

  console.log('✅ Super Admin Seeded Successfully');
  console.log('Organization:', organization.name);
  console.log('Email:', adminEmail);
  console.log('Password:', password);
};

const main = async () => {
  try {
    await seedSuperAdmin();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();