enum Type_Address {
  Entrega = 'Entrega',
  Faturamento = 'Faturamento',
}

export class Address {
  id?: string;
  tipo: Type_Address;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
}
