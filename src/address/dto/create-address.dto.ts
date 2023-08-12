import {
  Allow,
  IsEnum,
  IsUUID,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { Type_Address } from '../entities/address.entity';
import { MessagesHelper } from '../helpers/messages.helper';
import { ValidateUF } from 'src/util/validate-UF';

export class CreateAddressDto {
  /**
   * O tipo do endereço só deve ser possível valores Entrega ou Faturamento
   * @example "Entrega"
   */
  @IsEnum(Type_Address, { message: MessagesHelper.ADDRESS_TIPO_NOT_VALID })
  tipo: Type_Address;

  /**
   * O cep deve ser informado sem - o digitos
   * @example "22240000"
   */
  @Matches(/\d{8}$/, { message: MessagesHelper.ADDRESS_CEP_NOT_VALID })
  cep: string;

  /**
   * O logradouro deve possuir no minímo 8 caracteres
   * @example "Rua das Laranjeiras"
   */
  @MinLength(8, { message: MessagesHelper.ADDRESS_LOGRADOURO_NOT_VALID })
  logradouro: string;

  /**
   * O numero deve ser informado sempre quando não existir número utilize a expreção "sem número"
   * @example "21"
   */
  @MinLength(1, { message: MessagesHelper.ADDRESS_NUMERO_NOT_VALID })
  numero: string;

  /**
   * O Complemento é opcional"
   * @example "Apto 305"
   */
  @Allow()
  complemento?: string;

  /**
   * O bairro deve possuir no minímo 2 caracteres
   * @example "Tijuca"
   */
  @MinLength(2, { message: MessagesHelper.ADDRESS_BAIRRO_NOT_VALID })
  bairro: string;

  /**
   * A Cidade deve possuir no minímo 2 caracteres
   * @example "Rio de Janeiro"
   */
  @MinLength(2, { message: MessagesHelper.ADDRESS_CIDADE_NOT_VALID })
  cidade: string;

  /**
   * UF deve possuir 2 Letras maiúsculas e deve ser uma unidade da Federação válida
   * @example "UF"
   */
  @Validate(ValidateUF, { message: MessagesHelper.ADDRESS_UF_NOT_VALID })
  uf: string;

  /**
   * ofranchiseUnitId  deve ser um Id válido para Unidade de Franquia
   * @example "6b54e248-ad2d-4293-b671-6a0ca6498e78"
   */
  @IsUUID('4', { message: MessagesHelper.ADDRESS_FRANCHISE_UNIT_NOT_VALID })
  franchiseUnitId: string;
}
