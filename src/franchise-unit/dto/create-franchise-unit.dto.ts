import { IsUUID, MinLength, Validate } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { ValidateCnpj } from 'src/util/validate-cnpj';

export class CreateFranchiseUnitDto {
  @MinLength(10, { message: MessagesHelper.UNIT_NAME_NOT_VALID })
  name: string;

  @Validate(ValidateCnpj, { message: MessagesHelper.UNIT_CNPJ_NOT_VALID })
  cnpj: string;

  @IsUUID('4', { message: MessagesHelper.UNIT_MANAGER_NOT_VALID })
  managerId: string;
}
