import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import axios from 'axios';
import { CepResponse } from './types/cepResponse';
import { FranchiseUnitService } from 'src/franchiseUnit/franchiseUnit.service';
import { MessagesHelper } from './helpers/messages.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly franchiseUnitService: FranchiseUnitService,
  ) {}

  async getAddressApiCep(cep: string): Promise<CepResponse> {
    const regexCEP = /\d{5}[-\s]?\d{3}$/;
    if (!regexCEP.test(cep)) {
      throw new BadRequestException('cep informado não é valodo');
    }
    try {
      const url = process.env.CEP_URL;
      const response = await axios.get<CepResponse>(`${url}/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Acesso a API dos correios inoperante tente mais tarde',
      );
    }
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const existsUnit = this.franchiseUnitService.findById(
      createAddressDto.franchiseUnitId,
    );
    if (!existsUnit) {
      throw new BadRequestException(
        MessagesHelper.ADDRESS_FRANCHISE_UNIT_NOT_FOUND,
      );
    }
    const existsAddress = await this.prisma.address.findFirst({
      where: {
        tipo: createAddressDto.tipo,
        franchiseUnitId: createAddressDto.franchiseUnitId,
      },
    });

    if (existsAddress) {
      throw new BadRequestException(MessagesHelper.ADDRESS_TYPE_ALREDY_EXISTS);
    }

    const createdAddress = await this.prisma.address.create({
      data: createAddressDto,
    });

    return createdAddress;
  }

  async findById(id: string): Promise<Address> {
    const existsAddress = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!existsAddress) {
      throw new BadRequestException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    return existsAddress;
  }

  async findByUnitId(id: string): Promise<Address[]> {
    const existsUnit = await this.franchiseUnitService.findById(id);
    if (!existsUnit) {
      throw new BadRequestException(
        MessagesHelper.ADDRESS_FRANCHISE_UNIT_NOT_FOUND,
      );
    }
    const existsAddress = await this.prisma.address.findMany({
      where: { franchiseUnitId: id },
    });
    if (!existsAddress) {
      throw new BadRequestException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    return existsAddress;
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const existsAddress = this.findById(id);
    if (!existsAddress) {
      throw new BadRequestException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    if (updateAddressDto.franchiseUnitId) {
      throw new BadRequestException(
        MessagesHelper.ADDRESS_FRANCHISE_UNIT_NOT_UPDATE,
      );
    }
    const updateAddress = await this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
    return updateAddress;
  }

  async remove(id: string): Promise<string> {
    const existsAddress = this.findById(id);
    if (!existsAddress) {
      throw new BadRequestException(MessagesHelper.ADDRESS_NOT_FOUND);
    }
    await this.prisma.address.delete({ where: { id } });
    return `Endereço #${id} removido com sucesso`;
  }
}
