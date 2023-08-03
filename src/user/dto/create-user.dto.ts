import {
  IsEmail,
  IsNumber,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { MessagesHelper } from '../helpers/messages.helper';

export class CreateUserDto extends User {
  @IsEmail({}, { message: MessagesHelper.USER_EMAIL_NOT_VALID })
  email: string;

  @MinLength(3, { message: MessagesHelper.USER_NAME_NOT_VALID })
  name: string;

  @MinLength(6, { message: MessagesHelper.USER_PASSWORD_NOT_VALID })
  @MaxLength(10, { message: MessagesHelper.USER_PASSWORD_NOT_VALID })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: MessagesHelper.USER_PASSWORD_NOT_STRONG,
  })
  password: string;

  @IsNumber({}, { message: MessagesHelper.USER_ROLE_ID_NOT_VALID })
  roleId: number;
}
