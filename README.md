# Semana OmniStack 10 - devRadar

### DevRadar: Utilizando Node.js v12, React.js e React Native para desenvolver aplicações backend, web e mobile


## DevRadar

Projeto fullstack para cadastro e busca de desenvolvedores.

* backend - Node.js: cadastra e lista os devs. Busca as informações no github e utiliza o mongodb para armazenamento.
* web - React,js: interface web para o cadastro de devs
* mobile - React Native: permite pesquisar os devs próximos

### Instruções


### backend

```shell
$ cd backend

$ npm install

$ npx nodemon src/index.js

# https://localhost:3333
```


### web

```shell
$ cd web

$ npm install

$ gedit ./src/services/api.js
baseURL: 'http://67.207.87.192:3333' # backend rodando

$ npm start

# https://localhost:3000


```


### mobile

```shell
$ cd web

$ npm install

$ gedit ./src/services/api.js
baseURL: 'http://67.207.87.192:3333' # backend rodando

$ npm start

# https://localhost:19002

```

