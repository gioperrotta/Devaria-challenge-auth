import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class LoginDto {
  /**
   * O e-mail identificará o usuário no login
   * @example "email@email.com"
   */
  @IsEmail({}, { message: MessagesHelper.AUTH_EMAIL_NOT_VALID })
  email: string;

  /**
   * O password junto com o e-mail autenticará usuário no login
   * @example "Aa1234"
   */
  @IsNotEmpty({ message: MessagesHelper.AUTH_PASSWORD_NOT_VALID })
  password: string;
}
