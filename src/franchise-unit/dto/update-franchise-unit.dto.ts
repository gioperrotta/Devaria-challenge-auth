import { PartialType } from '@nestjs/mapped-types';
import { CreateFranchiseUnitDto } from './create-franchise-unit.dto';

export class UpdateFranchiseUnitDto extends PartialType(CreateFranchiseUnitDto) {}
