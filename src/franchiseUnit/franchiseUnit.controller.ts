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
import { FranchiseUnitService } from './franchiseUnit.service';
import { CreateFranchiseUnitDto } from './dto/create-franchise-unit.dto';
import { UpdateFranchiseUnitDto } from './dto/update-franchise-unit.dto';
import { AccessRolesGuard } from 'src/auth/guards/roleAccess.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/role/types/roleName.enum';

@Controller('franchise-unit')
@UseGuards(AccessRolesGuard)
export class FranchiseUnitController {
  constructor(private readonly franchiseUnitService: FranchiseUnitService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createFranchiseUnitDto: CreateFranchiseUnitDto) {
    return this.franchiseUnitService.create(createFranchiseUnitDto);
  }

  @Get()
  findAll() {
    return this.franchiseUnitService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.franchiseUnitService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateFranchiseUnitDto: UpdateFranchiseUnitDto,
  ) {
    return this.franchiseUnitService.update(id, updateFranchiseUnitDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.franchiseUnitService.remove(id);
  }
}
