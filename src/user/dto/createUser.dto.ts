import {
  IsEmail,
  IsNumberString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class CreateUserDto {
  /**
   * email deve ser único na coleção e servirá para identificar um usuário
   * deverá possuir um formato de email válido
   * @example "gio@sistema.com"
   */
  @IsEmail({}, { message: MessagesHelper.USER_EMAIL_NOT_VALID })
  email: string;

  /**
   * name representa o nome ou apelido do usuário do sistema
   * deverá possuir no mínimo 3 caracteres
   * @example "Giovanni"
   */
  @MinLength(3, { message: MessagesHelper.USER_NAME_NOT_VALID })
  name: string;

  /**
   * a password será utilizada para autenticar os usuários no sistema
   * deverá ser forte com um mínimo 6 caracteres e no máximo 10 cracteres
   * deverá possuir no mínimo 1 letra maiuscula e no mínimo 1 letra minuscula
   * @example "Gp1234"
   */
  @MinLength(6, { message: MessagesHelper.USER_PASSWORD_NOT_VALID })
  @MaxLength(10, { message: MessagesHelper.USER_PASSWORD_NOT_VALID })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: MessagesHelper.USER_PASSWORD_NOT_STRONG,
  })
  password: string;

  /**
   * roleId representa um identificar válido de uma Role
   * deverá ser um número entre 1 e 4
   * @example 2
   */
  @IsNumberString({}, { message: MessagesHelper.USER_ROLE_ID_NOT_VALID })
  roleId: number;

  avatarUrl?: string;
}
