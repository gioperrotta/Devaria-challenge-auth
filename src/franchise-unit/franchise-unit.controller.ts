import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FranchiseUnitService } from './franchise-unit.service';
import { CreateFranchiseUnitDto } from './dto/create-franchise-unit.dto';
import { UpdateFranchiseUnitDto } from './dto/update-franchise-unit.dto';

@Controller('franchise-unit')
export class FranchiseUnitController {
  constructor(private readonly franchiseUnitService: FranchiseUnitService) {}

  @Post()
  create(@Body() createFranchiseUnitDto: CreateFranchiseUnitDto) {
    return this.franchiseUnitService.create(createFranchiseUnitDto);
  }

  @Get()
  findAll() {
    return this.franchiseUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchiseUnitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFranchiseUnitDto: UpdateFranchiseUnitDto,
  ) {
    return this.franchiseUnitService.update(id, updateFranchiseUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchiseUnitService.remove(id);
  }
}
