import { IsEnum, IsInt, Max, Min, MinLength } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

import { Role } from '../types/role.enum';

export class CreateRoleDto {
  /**
   * O name da Role poderá conter um dos seguintes valoes únicos na coleção:
   * Admin, Manager, Employee, User
   * Somente um usuaário autenticado  Admin poderá criar Novas Roles
   * @example "Manager"
   */
  @IsEnum(Role, { message: MessagesHelper.ROLE_NAME_NOT_VALID })
  name: string;

  /**
   * A description deve conter uma descrição da Role e deverá ter no mínimo 8 caracteteres:
   * @example "Gerente de uma unidade de Franquia"
   */
  @MinLength(8, { message: MessagesHelper.ROLE_DESCRIPTION_NOT_VALID })
  description: string;

  /**
   * O level representa o nível da Role e é um valor numerico,
   * O nível "0" representa a Role de maior responsabilidade e maior poder no sistema
   * O nível "9" representa a Role de menor responsabilidade emenor poder no sistema
   * @example 1
   */
  @IsInt({ message: MessagesHelper.ROLE_LEVEL_NOT_VALID })
  @Min(0, { message: MessagesHelper.ROLE_LEVEL_LESS_THAN_MIN })
  @Max(9, { message: MessagesHelper.ROLE_LEVEL_GREATER_THAN_MAX })
  level: number;
}
