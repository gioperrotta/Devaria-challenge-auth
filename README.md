# App 

# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar usuário (users)
- [x] Deve ser possível se autenticar
- [x] Deve ser possível se cadastrar funções (roles )
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter informações do endereço consulatando cep
- [x] Deve ser possível o usuário alterar sua própia senha

- [ ] 
- [ ] 
- [ ] 

# RNs (Regras de negócio)
- [x] O usuário não pode ser cadastrado com email duplicado
- [x] Role não pode ser cadastrado com name duplicado
- [x] Somente usuários Admin poderão cadastrar, excluir e alterar funções (roles)
- [x] Somente usuários com autorização poderão acessar recurso expecíficos
- [x] Usuários administradores poderão acessar qualquer recurso
- [x] O usuário deve estar autenticado para cadastrar outro usuário
- [x] O usuário só poderá cadastrar outro usuário de função inferior a sua

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
     
