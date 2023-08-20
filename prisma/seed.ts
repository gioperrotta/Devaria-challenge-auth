import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();
const roles = [
  {
    name: 'Admin',
    description: 'Administrador do sistema',
    level: 0,
  },
  {
    name: 'Manager',
    description: 'Gerente de unidade de Farnquia',
    level: 1,
  },
  {
    name: 'Employee',
    description: 'Colaborador de unidade de Farnquia',
    level: 2,
  },
  {
    name: 'User',
    description: 'Usuário da aplicação',
    level: 3,
  },
];

async function createUserAdmin() {
  const passwordHash = await hash('Gp1234', 6);

  const user = {
    name: 'Giovanni Admin',
    email: 'gio@admin.com.br',
    password: passwordHash,
    roleId: 1,
  };

  const exitUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!exitUser) {
    await prisma.user.create({ data: user });
  }

  return;
}

async function createRoles() {
  roles.forEach(async (role) => {
    const exitRole = await prisma.role.findUnique({
      where: { name: role.name },
    });
    const data = role;
    if (!exitRole) {
      await prisma.role.create({ data });
    }
  });
  return;
}

async function main() {
  console.log('Run sedd');
  await createRoles();
  await createUserAdmin();
  await prisma.$disconnect();
  console.log('seed executed successfully');
}

main();
