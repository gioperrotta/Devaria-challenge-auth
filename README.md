
# <p align="center">AUTHENTICATION - AUTHORIZATION ROLES COM NESTJS</p>

Me foi proposto um desafio, fazer um pequeno projeto de estudo para aprender como funciona o sistema de autorização utilizando NestJS e autenticação com JWT.
Esse projeto tem por objetivo, permitir ou não, acesso aos recursos da API, de acordo com a Role associada ao usuário autenticado.
Outro ponto importante é que somente usuários autenticados com Administradores, podem criar usuários de qualquer tipo.
Usuários com a "Role Manager"  só podem criar outros usuários de nível inferior ao seu.

- ### Nesse projeto foram implementados os seguintes módulos:
  - user
  - auth
  - role
  - franchiseUnit
  - address

- ### Objetivo principal:
Criar umm mecanismo de controle de acesso definido em torno de funções e privilégios, 
Para isso implementei as seguintes estruturas.
  - Role Enum -> src/role/types/role.enum.ts contendo as roles do sistema.
  - decorator @Roles -> src/auth/decorators/roles.decorator.ts
  - guard RoleAccessGuard -> src/auth/guards/roleAccess.guard.ts.
  
    A classe <strong>RolesAccesGuard</strong> no metodo <strong>canActivate</strong>,
    comparará as roles atribuídas ao usuário atual com as funções reais exigidas pela rota passadas como parametro no decorator @Roles(). 

Além dessas estruturas foi necessário implementar da estratégia de authenticação com jwt
  - decorator @IsPublic -> src/auth/decorators/isPubluc.decorator.ts
  - guard JwtAuthGuard -> src/auth/guards/jet.guard.ts
  - strategy JwtStrategy -> src/auth/strategies/jwt.strategy.ts



## RFs (Requisitos funcionais)
- [x] Deve ser possível se cadastrar usuário (users)
- [x] Deve ser possível se autenticar
- [x] Deve ser possível se cadastrar funções (roles )
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter informações do endereço consulatando cep
- [x] Deve ser possível o usuário alterar sua própia senha
- [x] Deve ser possível cadastrar Unidades de Franquia( Franchise Unit)
- [x] Deve ser possível associar um usuário como gerente de uma unidade de Franquia
- [x] Deve ser possivel cadastrar endereços(Address) para Unidades de Franquia

## RNs (Regras de negócio)
- [x] O usuário não pode ser cadastrado com email duplicado
- [x] Role não pode ser cadastrado com name duplicado
- [x] Somente usuários com autorização poderão acessar recurso expecíficos
- [x] Usuários Admin poderão acessar qualquer recurso
- [x] O usuário deve estar autenticado para cadastrar outro usuário
- [x] O usuário só poderá cadastrar outro usuário de função inferior a sua
- [x] O CNPJ da unidade de Franquia não pode ser duplicado
- [x] O CNPJ deve ser validado de acordo com seus dgitos verificadores
- [x] Cada unidade de Franquia só poderá ter dois endereços
  - Entrega
  - Faturamento

## RNFs (requisitos não-funcionais)
- [x] A senha do usuario tem que estar criptografada e deve ser forte
- [x] Os dados do app devem estar pressistidos em um banco PostgreSQL
- [x] O usuário tem que ser identificado e autenticado por um JWT (JSON Web Token)
- [x] O decorator @IsPublic() deve preceder todas as rotas que não necessitam de autenticação
- [x] O decorator @UseGuards e @Roles() determinarão as regras de autorização de cada rota privada
- [x] Para consulta de cep vamos utilizar a API https://viacep.com.br/ws
- [x] Deve ser criado um tipo enum que contempla as seguintes Roles
  - Admin
  - Manager
  - Employee
  - User
