![Thumbnail](https://github.com/user-attachments/assets/be9afbb4-1efc-472a-8aca-30969adcef59)

<p align="center">
  <img alt="Repo size"  src="https://img.shields.io/github/repo-size/geovaneborba/ftr-pos-upload-widget-server?color=4f46e5&style=for-the-badge">
  <img alt="GitHub top language"  src="https://img.shields.io/github/languages/top/geovaneborba/ftr-pos-upload-widget-server?color=4f46e5&style=for-the-badge"> 
  <img alt="GitHub language count"  src="https://img.shields.io/github/languages/count/geovaneborba/ftr-pos-upload-widget-server?color=4f46e5&style=for-the-badge">
</p>

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0;
  <a href="#books-aprendizado">Aprendizado</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#warning-pré-requisitos"> Pré requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a> &#xa0;
</p>

<br>

## :dart: Sobre

API de upload de imagens utilizando Node.js e Cloudflare R2 como alternativa ao Amazon S3. Com ela, é possível realizar uploads de arquivos para o Cloudflare R2, que é um serviço de armazenamento de objetos em nuvem. E também é possível estar gerando relatórios dos uploads realizados e baixando os arquivos em formato CSV.

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :books: Aprendizado

- Estratégias de Geração de IDs únicos
- Documentação de APIs com Swagger
- Lidar com paginação OFFSET e Cursor-Based
- Tratativa de erros com o type Either
- Testes de Integração
- Validação de dados com Zod
- Gerar relatórios dos uploads em formato CSV

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :rocket: Tecnologias

As seguintes tecnologias foram usadas na construção do projeto:

- Node.js
- Fastify
- TypeScript
- Drizzle ORM
- PostgreSQL
- Cloudflare R2
- Docker
- Vitest
- Zod

Outras dependências e ferramentas utilizadas podem ser encontradas no arquivo [package.json](./package.json)

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :warning: Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Subindo o PostgreSQL com Docker Compose

Se você não possui o PostgreSQL instalado localmente, pode usar o [docker-compose.yml](./docker-compose.yml) para configurar uma instância rapidamente. Siga os passos abaixo:

1. Certifique-se de ter o Docker e o Docker Compose instalados.

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

2. Inicie o PostgreSQL:

```bash
# Execute o comando abaixo para iniciar o PostgreSQL com Docker Compose
# O arquivo docker-compose.yml já está disponível na raiz do projeto.
$ docker-compose up -d
```

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :checkered_flag: Começando

```bash
# Clone o repositórios abaixo
$ git clone https://github.com/geovaneborba/ftr-pos-upload-widget-server.git
# Entre na pasta e instale as dependências
$ cd ftr-pos-upload-widget-server && npm i
# Cie um arquivo .env e utilize o .env.example como base para configurar suas variáveis de ambiente
$ cp .env.example .env
# Execute as migrations para preparar o banco de dados
$ npm run db:generate  # Gera os arquivos de mapeamento do Drizzle ORM
$ npm run db:migrate   # Aplica as migrations no banco de dados
# Inicie o projeto
$ npm run dev
```

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>
<p align="center">Feito com ❤️ por <a href="https://github.com/geovaneborba" target="_blank">Geovane Borba</a></p>
