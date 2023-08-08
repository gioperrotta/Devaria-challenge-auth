import { Matches } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class ChangePasswordDto {
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: MessagesHelper.USER_PASSWORD_NOT_STRONG + ' ESTOU AQUI Password',
  })
  password: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      MessagesHelper.USER_PASSWORD_NOT_STRONG + ' ESTOU AQUI newPassword',
  })
  newPassword: string;
}
