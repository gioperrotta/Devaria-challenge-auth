import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IsPublic } from 'src/auth/decorators/isPublic.decorator';
import { AccessRolesGuard } from 'src/auth/guards/roleAccess.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role/types/roleName.enum';

@Controller('address')
@UseGuards(AccessRolesGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @IsPublic()
  @Get('consulta-cep/:cep')
  getAddressApiCep(@Param('cep') cep: string) {
    return this.addressService.getAddressApiCep(cep);
  }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @Get('by-unit/:id')
  findByUnitId(@Param('id') id: string) {
    return this.addressService.findByUnitId(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Manager)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
