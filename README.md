# Restaurants Manager API

O objetivo desta API é permitir que os usuários gerenciem restaurantes e os produtos do seu cardápio.


## Tecnologias utilizadas

TypeScript, Node, Express.js, JWT, Prisma e Jest.


## Funcionalidades

### Usuários
- Cadastrar um novo usuário
- Obter dados de usuário
- Editar dados de usuário
- Deletar usuário
- Obter token para autenticação do usuário

### Restaurantes
- Cadastrar um novo restaurante
- Listar todos os restaurantes de um usuário
- Obter dados de um restaurante
- Editar dados de um restaurante
- Deletar um restaurante

### Categorias
- Cadastrar uma nova categoria de produtos
- Listar todas as categorias de um restaurante
- Obter dados de uma categoria
- Editar os dados de uma categoria
- Deletar uma categoria

### Promoções
- Cadastrar uma nova promoção
- Associar produtos a uma promoção
- Desassociar produtos a uma promoção
- Listar todas as promoções de um restaurante
- Obter dados de uma promoção e dos produtos associados
- Editar os dados de uma promoção
- Deletar uma promoção

### Produtos
- Cadastrar um novo produto
- Listar todos os produtos de um restaurante, permitindo ordenação dos resultados por preço e filtragem por nome, categoria e valores de máximo e mínimo
- Obter dados de um produto
- Editar dados de um produto
- Deletar um produto
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/samueldbferreira/restaurants-manager.git
```

Entre no diretório do projeto

```bash
  cd restaurants-manager
```

Instale as dependências

```bash
  npm install
```

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL="#"`

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando


```bash
  npm test
```


## Documentação

[Documentação](https://link-da-documentação)

