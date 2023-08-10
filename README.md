# App 

# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar usuário (users)
- [x] Deve ser possível se autenticar
- [x] Deve ser possível se cadastrar funções (roles )
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter informações do endereço consulatando cep
- [x] Deve ser possível o usuário alterar sua própia senha
- [x] Deve ser possível cadastrar Unidades de Franquia( Franchise Unit)
- [x] Deve ser possível associar um usuário como gerente de uma unidade de Franquia
- [x] Deve ser possivel cadastrar endereços(Address) para Unidades de Franquia 

# RNs (Regras de negócio)
- [x] O usuário não pode ser cadastrado com email duplicado
- [x] Role não pode ser cadastrado com name duplicado
- [x] Somente usuários com autorização poderão acessar recurso expecíficos
- [x] Usuários Admin poderão acessar qualquer recurso
- [x] O usuário deve estar autenticado para cadastrar outro usuário
- [x] O usuário só poderá cadastrar outro usuário de função inferior a sua
- [x] O CNPJ da unidade de Franquia não pode ser duplicado
- [x] O CNPJ deve ser validado de acordo com seus dgitos verificadores
- [x] Cada unidade de Franquia só poderá ter dois endereços: Entrega e Faturamento

# RNFs (requisitos não-funcionais)
- [x] A senha do usuario tem que estar criptografada e deve ser forte
- [x] Os dados do app devem estar pressistidos em um banco PostgreSQL
- [x] O usuário tem que ser identificado e autenticado por um JWT (JSON Web Token)
- [x] O decorator @IsPublic() deve preceder todas as rotas que não necessitam de autenticação
- [x] Para consulta de cep vamos utilizar a API https://viacep.com.br/ws
- [x] Deve ser criado um tipo enum que contempla as seguintes Roles
    . Admin
    . Manager
    . Employee
    . User
     
