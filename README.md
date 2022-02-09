<h1 align="center">:file_cabinet: Gerenciamento de projetos e colaboradores</h1>

## :memo: Descrição
Projeto backend afim de gerenciar projetos com nome, data, status e colabores participantes.

## :books: Funcionalidades
* <b>Login</b>: Validação de usuário e senha com o banco de dados e autenticação JWT. É necessário fazer login para ter acesso as outras funcionalidades. Acessível na rota (auth/login)
* <b>CRUD de projetos</b>: Manipulação de projetos.
* <b>CRUD de colaboradores</b>: Manipulação de colaboradores.
* <b>CRUD de usuarios</b>: Manipulação de usuarios.
* <b>Info de rotas do projeto</b>: Documento da API

## :wrench: Tecnologias utilizadas
* NestJS
* SQLite
* TypeORM
* JwT

## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para iniciar o projeto:
```
<npm run start>
```

## :warning: Avisos
### Recomendável ter um arquivo .env na raiz do projeto com os seguintes campos:
* SECRECT = Este é para o scret do JWT, qualquer string aleatória já serve
* ENCRYPT_KEY = Para criptografia do typeorm-encrypt. Caso de dúvida da uma olhada na documentação https://www.npmjs.com/package/typeorm-encrypted
* ENCRYPT_IV = Para critpgrafia do typeorm-encrypt. Caso de dúvida da uma olhada na documentação https://www.npmjs.com/package/typeorm-encrypted

<!-- ## :soon: Implementação futura
* O que será implementado na próxima sprint? -->

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Mert1s">
        <img src="https://avatars.githubusercontent.com/u/70107407?v=4" width="100px;" alt="Foto de Tati Alves no GitHub"/><br>
        <sub>
          <b>Mert1s</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* Andamento