import { IsUUID, MinLength, Validate } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { ValidateCnpj } from 'src/util/validate-CNPJ';
import { FranchiseUnit } from '../entities/franchise-unit.entity';

export class CreateFranchiseUnitDto extends FranchiseUnit {
  @MinLength(10, { message: MessagesHelper.UNIT_NAME_NOT_VALID })
  name: string;

  @Validate(ValidateCnpj, { message: MessagesHelper.UNIT_CNPJ_NOT_VALID })
  cnpj: string;

  @IsUUID('4', { message: MessagesHelper.UNIT_MANAGER_NOT_VALID })
  managerId: string;
}
