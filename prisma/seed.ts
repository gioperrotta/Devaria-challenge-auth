import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();
const roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Administrador do sistema',
    level: 0,
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Gerente de unidade de Farnquia',
    level: 1,
  },
  {
    id: 3,
    name: 'Employee',
    description: 'Colaborador de unidade de Farnquia',
    level: 2,
  },
  {
    id: 4,
    name: 'User',
    description: 'Usuário da aplicação',
    level: 3,
  },
];

const user = {
  name: 'Giovanni Admin',
  email: 'gio@admin.com.br',
  password: 'Gp1234',
  roleId: 1,
};

async function main(): Promise<void> {
  console.log('seed is running');
  try {
    for (let i = 0; i < roles.length; i++) {
      const name = roles[i].name;
      const existsRole = await prisma.role.findUnique({ where: { name } });
      if (!existsRole) {
        const data = roles[i];
        await prisma.role.create({ data });
      }
    }

    const exitUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    const data = { ...user, password: await hash('Gp1234', 6) };
    if (!exitUser) {
      await prisma.user.create({ data });
    }
    await prisma.$disconnect();
    console.log('seed executed successfully');
  } catch (error) {
    console.log(error);
  }
}

main();
