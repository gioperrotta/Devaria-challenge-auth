import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function setInitialRoleData() {
  const roles = await prisma.role.findMany();
  if (roles.length === 4) return;

  await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Administrador do sistema',
      level: 0,
    },
  });

  await prisma.role.create({
    data: {
      name: 'Manager',
      description: 'Gerente de unidade de Farnquia',
      level: 1,
    },
  });

  await prisma.role.create({
    data: {
      name: 'Employee',
      description: 'Colaborador de unidade de Farnquia',
      level: 2,
    },
  });

  await prisma.role.create({
    data: {
      name: 'User',
      description: 'Usuário da aplicação',
      level: 3,
    },
  });
}

async function setInitialDataDb() {
  setInitialRoleData();

  const user = await prisma.user.findUnique({
    where: { email: 'gio@admin.com.br' },
  });
  if (user) {
    await prisma.user.delete({
      where: { email: 'gio@admin.com' },
    });
  }
  await prisma.user.create({
    data: {
      name: 'Giovani Admin',
      email: 'gio@admin.com.br',
      password: await hash('Gp1234', 6),
      roleId: 1,
    },
  });
}

setInitialDataDb();
