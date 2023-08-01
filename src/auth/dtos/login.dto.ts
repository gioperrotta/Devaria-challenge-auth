import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';

export class LoginDto {
  @IsEmail({}, { message: MessagesHelper.AUTH_EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.AUTH_PASSWORD_NOT_VALID })
  password: string;
}
