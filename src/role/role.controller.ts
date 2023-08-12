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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

import { AccessRolesGuard } from 'src/auth/guards/roleAccess.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './types/role.enum';
import { IsPublic } from 'src/auth/decorators/isPublic.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
@UseGuards(AccessRolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Roles(Role.Admin)
  @IsPublic()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roleService.findById(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
