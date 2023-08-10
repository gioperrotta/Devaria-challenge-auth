import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateCnpj', async: false })
export class ValidateUF implements ValidatorConstraintInterface {
  validate(uf: string) {
    const isTowLetters = /^[A-Z]{2}$/.test(uf);
    if (!isTowLetters) return false;
    const ufs =
      'AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO';
    const index = ufs.split(',').findIndex((e) => e === uf);
    if (index < 0) return false;
    return true;
  }
}
