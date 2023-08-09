import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateCnpj', async: false })
export class ValidateCnpj implements ValidatorConstraintInterface {
  _validCalc(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
  }

  validate(cnpj: string) {
    const isString = typeof cnpj === 'string';
    if (!isString) return false;

    const isDigitsOnly = /^\d{14}$/.test(cnpj);
    if (!isDigitsOnly) return false;

    const numbers = cnpj.split('').map(Number);
    if (numbers.length !== 14) return false;

    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)];
    if (items.length === 1) return false;

    // Separa os 2 últimos dígitos verificadores
    const digits = numbers.slice(12);

    // Valida 1o. dígito verificador
    const digit0 = this._validCalc(12, numbers);
    if (digit0 !== digits[0]) return false;

    // Valida 2o. dígito verificador
    const digit1 = this._validCalc(13, numbers);
    return digit1 === digits[1];
  }
}
