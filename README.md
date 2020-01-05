<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Projeto Final - Rocketseat Bootcamp (OmniStack 9)
</h3>
<h3 align="center">

</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/fernandofogliato/gympoint?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/fernandofogliato/gympoint/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/fernandofogliato/gympoint?style=social">
  </a>
</p>

## Sobre o projeto

Aplicação desenvolvida com o intuito de praticar e consolidar o aprendizado adquirido por meio do bootcamp OmniStack ministrado pela equipe da Rocketseat. Trata-se de uma aplicação simples para gerenciamento de academias composto por três projetos: backend (NodeJS), frontend (ReactJS) e mobile (ReactNative). O projeto frontend reúne as funcionalidades disponibilizadas para o administrador da academia, já o mobile oferece funcionalidades para os alunos da mesma.


### Instalação

Database e Redis

Para criar o banco de dados execute na pasta raiz do projeto o comando:

```
$> docker-compose up -d
```

### Backend

Para baixar as dependências do projeto, navegue até a pasta backend e rode o seguinte comando:

```
$> yarn
```

Ainda na pasta backend, para criar as tabelas e dados iniciais no banco de dados execute o seguinte comando:

```
$> yarn sequelize-cli db:migrate
```

e

```
$> yarn sequelize-cli db:seed:all
```

Iniciar o servidor:

```
$> yarn dev
```

Iniciar o gerenciador de filas:

```
$> yarn queue
```

### Frontend

Para baixar as dependências do projeto, navegue até a pasta frontend e rode o seguinte comando:

```
$> yarn
```

Iniciar aplicação frontend

```
$> yarn start
```

### Mobile

O projeto mobile foi desenvolvido e testado no **ANDROID** utilizando o emulator do **Android-SDK**.

Instalar as dependências do projeto:

```
$> yarn
```
### Iniciar aplicação

```
$> react-native start
$> react-native run-android
```
