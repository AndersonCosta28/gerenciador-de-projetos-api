<h1 align="center">:file_cabinet: Gerenciamento de projetos e colaboradores</h1>

## :memo: Descrição
API afim de gerenciar projetos com nome, data, status e colabores participantes.

## :books: Funcionalidades
* <b>Login</b>: Validação de usuário e senha com o banco de dados e autenticação JWT. É necessário fazer login para ter acesso as outras funcionalidades. Acessível na rota (auth/login)
* <b>CRUD de projetos</b>: Manipulação de projetos.
* <b>CRUD de colaboradores</b>: Manipulação de colaboradores.
* <b>CRUD de usuarios</b>: Manipulação de usuarios.
* <b>Info de rotas do projeto</b>: [Documento da API](http://localhost:3000/api/)

## :wrench: Tecnologias utilizadas
* [NestJS](https://nestjs.com/)
* PostgreSQL
* [Bcrypt](https://www.npmjs.com/package/bcrypt/)
* [JwT](https://jwt.io/)
* [TypeORM](https://typeorm.io/)

## :rocket: <span id="rodando_o_projeto">Rodando o projeto</span>
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para iniciar o projeto:
```
<
npm i
npm run build
npm run typeorm migration:run
npm run start
>
```

## :warning: Avisos
### Recomendável ter um arquivo .env na raiz do projeto com os seguintes campos:
* SECRECT = Este é para o scret do JWT, qualquer string aleatória já serve

<!-- ## :soon: Implementação futura
* O que será implementado na próxima sprint? -->

## :runner: Como funciona:
1. Executar os <a href="#rodando_o_projeto">comandos para compilar e iniciar o projeto</a>
2. Com o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download), acessar a [rota de login](http://localhost:3000/auth/login) `http://localhost:3000/auth/login`, ele irá usar a porta 3000
3. <span id="etapa_3">No método POST iremos passar no corpo da requisição `{"username": "admin", "password": "123456"}`, este é o usuário padrão criado a partir da migration</span>
4. <span id="etapa_4">O retorno da requisição acima será um TOKEN JWT que iremos utilizar</span>
5. Esse TOKEN iremos usar na aba de autorização para utilizar em todos os outros endpoint's, o type é Bearer token, [segue print](https://i.ibb.co/g64YFDh/postman-usando-o-token.png) <img src ="https://i.ibb.co/g64YFDh/postman-usando-o-token.png" alt="Postman, login">

Obs.:
* O token retornado <a href="#etapa_4">(etapa 4)</a> tem tempo de expiração de 1 hora, caso expire é necessário fazer o login novamente <a href="#etapa_3">(etapa 3)</a>, gerando um novo TOKEN.
* Use a [rota](http://localhost:3000/api/) `http://localhost:3000/api/` para ver documentação da api

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Mert1s">
        <img src="https://avatars.githubusercontent.com/u/70107407?v=4" width="100px;" alt="Foto de Mert1s no GitHub"/><br>
        <sub>
          <b>Mert1s</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
* Andamento
