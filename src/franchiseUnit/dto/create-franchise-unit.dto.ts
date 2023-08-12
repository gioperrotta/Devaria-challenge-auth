import { IsUUID, MinLength, Validate } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { ValidateCnpj } from 'src/util/validate-CNPJ';
import { FranchiseUnit } from '../entities/franchise-unit.entity';

export class CreateFranchiseUnitDto extends FranchiseUnit {
  /**
   * O name representa no Brasil a razão social de uma empresa
   * Deverá possuir no mínimo 10 caracteres
   * @example "Empresa de Comércio Qualquer LTDA"
   */
  @MinLength(10, { message: MessagesHelper.UNIT_NAME_NOT_VALID })
  name: string;

  /**
   * O CNPJ é um identificador único para empresas no Brasil
   * Deverá possuir 14 digitos, o valor digitado será validado segundo a regra de validação atual.
   * @example "40239782000130"
   */
  @Validate(ValidateCnpj, { message: MessagesHelper.UNIT_CNPJ_NOT_VALID })
  cnpj: string;

  /**
   * O managerId deverá ser um Id válido para Usuario que possui a Role Manager
   * @example "6b54e248-ad2d-4293-b671-6a0ca6498e78"
   */
  @IsUUID('4', { message: MessagesHelper.UNIT_MANAGER_NOT_VALID })
  managerId: string;
}
