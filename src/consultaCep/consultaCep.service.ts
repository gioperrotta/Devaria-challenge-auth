import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CepResponse } from './types/cepResponse';

@Injectable()
export class ConsultaCepService {
  async getAddressByCep(cep: string): Promise<CepResponse> {
    const regexCEP = /\d{5}[-\s]?\d{3}$/;
    if (!regexCEP.test(cep)) {
      throw new BadRequestException('cep informado não é valodo');
    }
    try {
      const url = process.env.CEP_URL;
      const response = await axios.get<CepResponse>(`${url}/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Acesso a API dos correios inoperante tente mais tarde',
      );
    }
  }
}
