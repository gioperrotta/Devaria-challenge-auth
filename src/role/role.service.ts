import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from './entities/role.entity';
import { MessagesHelper } from './helpers/messages.helper';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existsRole = await this.prisma.role.findUnique({
      where: { name: createRoleDto.name },
    });

    if (existsRole) {
      throw new BadRequestException(MessagesHelper.ROLE_NAME_ALREDY_EXISTS);
    }

    const createdRole = await this.prisma.role.create({ data: createRoleDto });
    return createdRole;
  }

  async findAll(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async findById(id: number): Promise<Role> {
    const existsRole = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!existsRole) {
      throw new BadRequestException(MessagesHelper.ROLE_NOT_FOUND);
    }
    return existsRole;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existsRole = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!existsRole) {
      throw new BadRequestException(MessagesHelper.ROLE_NOT_FOUND);
    }

    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });

    return updatedRole;
  }

  async remove(id: number) {
    const existsRole = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!existsRole) {
      throw new BadRequestException(MessagesHelper.ROLE_NOT_FOUND);
    }

    await this.prisma.role.delete({ where: { id } });

    return `Esta ação removeu a #${existsRole.name} role`;
  }
}
