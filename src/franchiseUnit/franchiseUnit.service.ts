import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFranchiseUnitDto } from './dto/create-franchise-unit.dto';
import { UpdateFranchiseUnitDto } from './dto/update-franchise-unit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesHelper } from './helpers/messages.helper';
import { UserService } from 'src/user/user.service';
import { FranchiseUnit } from './entities/franchise-unit.entity';

@Injectable()
export class FranchiseUnitService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(
    createFranchiseUnitDto: CreateFranchiseUnitDto,
  ): Promise<FranchiseUnit> {
    const existsFranchiseUnit = await this.prisma.franchiseUnit.findUnique({
      where: { cnpj: createFranchiseUnitDto.cnpj },
    });

    if (existsFranchiseUnit) {
      throw new BadRequestException(MessagesHelper.UNIT_CNPJ_ALREDY_EXISTS);
    }

    const user = await this.userService.findById(
      createFranchiseUnitDto.managerId,
    );

    if (user.role.name !== 'Manager') {
      throw new BadRequestException(MessagesHelper.UNIT_MANAGER_NOT_FOUND);
    }

    const createdFranchiseUnit = await this.prisma.franchiseUnit.create({
      data: createFranchiseUnitDto,
    });

    return createdFranchiseUnit;
  }

  async findAll(): Promise<FranchiseUnit[]> {
    return await this.prisma.franchiseUnit.findMany();
  }

  async findById(id: string): Promise<FranchiseUnit> {
    const existsUnit = await this.prisma.franchiseUnit.findUnique({
      where: { id },
    });
    if (!existsUnit) {
      throw new BadRequestException(MessagesHelper.UNIT_ID_NOT_FOUND);
    }
    return await this.prisma.franchiseUnit.findUnique({ where: { id } });
  }

  async update(id: string, updateFranchiseUnitDto: UpdateFranchiseUnitDto) {
    if (updateFranchiseUnitDto.cnpj) {
      throw new BadRequestException(MessagesHelper.UNIT_CNPJ_NOT_CHANGE);
    }
    const existsUnit = await this.prisma.franchiseUnit.findUnique({
      where: { id },
    });
    if (!existsUnit) {
      throw new BadRequestException(MessagesHelper.UNIT_ID_NOT_FOUND);
    }
    const updatedUnit = await this.prisma.franchiseUnit.update({
      where: { id },
      data: updateFranchiseUnitDto,
    });

    return updatedUnit;
  }

  async remove(id: string) {
    const existsUnit = await this.prisma.franchiseUnit.findUnique({
      where: { id },
    });
    if (!existsUnit) {
      throw new BadRequestException(MessagesHelper.UNIT_ID_NOT_FOUND);
    }
    await this.prisma.franchiseUnit.delete({ where: { id } });
    return `This action removes a #${id} franchiseUnit`;
  }
}
