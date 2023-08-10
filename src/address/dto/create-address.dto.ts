import {
  Allow,
  IsEnum,
  IsUUID,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { Address, Type_Address } from '../entities/address.entity';
import { MessagesHelper } from '../helpers/messages.helper';
import { ValidateUF } from 'src/util/validate-UF';

export class CreateAddressDto extends Address {
  @IsEnum(Type_Address, { message: MessagesHelper.ADDRESS_TIPO_NOT_VALID })
  tipo: Type_Address;
  @Matches(/\d{8}$/, { message: MessagesHelper.ADDRESS_CEP_NOT_VALID })
  cep: string;

  @MinLength(8, { message: MessagesHelper.ADDRESS_LOGRADOURO_NOT_VALID })
  logradouro: string;

  @MinLength(1, { message: MessagesHelper.ADDRESS_NUMERO_NOT_VALID })
  numero: string;

  @Allow()
  complemento: string;

  @MinLength(2, { message: MessagesHelper.ADDRESS_BAIRRO_NOT_VALID })
  bairro: string;

  @MinLength(2, { message: MessagesHelper.ADDRESS_CIDADE_NOT_VALID })
  cidade: string;

  @Validate(ValidateUF, { message: MessagesHelper.ADDRESS_UF_NOT_VALID })
  uf: string;

  @IsUUID('4', { message: MessagesHelper.ADDRESS_FRANCHISE_UNIT_NOT_VALID })
  franchiseUnitId: string;
}
