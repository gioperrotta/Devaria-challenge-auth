import { Matches } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class ChangePasswordDto {
  /**
   * a password será utilizada verificar se é o próprio usuário que está tentando trocar a senha
   * deverá ser forte com um mínimo 6 caracteres e no máximo 10 cracteres
   * deverá possuir no mínimo 1 letra maiuscula e no mínimo 1 letra minuscula
   * @example "Gp1234"
   */
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: MessagesHelper.USER_PASSWORD_NOT_STRONG + ' ESTOU AQUI Password',
  })
  password: string;

  /**
   * a newPassword será utilizada para subistituir a senha anterior pela nova
   * deverá ser forte com um mínimo 6 caracteres e no máximo 10 cracteres
   * deverá possuir no mínimo 1 letra maiuscula e no mínimo 1 letra minuscula
   * @example "Zx1234"
   */
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      MessagesHelper.USER_PASSWORD_NOT_STRONG + ' ESTOU AQUI newPassword',
  })
  newPassword: string;
}
