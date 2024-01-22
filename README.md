# Melhor Pet Shop

Este é um sistema para calcular o melhor pet shop seguindo a ideia apresentada no teste prático da dti digital.

![peek](https://github.com/NilsonDeon/teste-dti/assets/81258205/924f089a-1436-42ce-81d9-7edca197296f)


![peek2](https://github.com/NilsonDeon/teste-dti/assets/81258205/d3b30abb-8139-4952-a9d5-e63ab0dacf7a)


## Tecnologias Utilizadas

- **Back-end em Javascript:** O projeto foi desenvolvido utilizando JavaScript como linguagem de back-end.
- **Node.js e Express:** Foram utilizados Node.js e o framework Express para criar o servidor e as rotas da aplicação.
- **SQLite como banco de dados:** Escolhi o banco de dados SQLite devido à sua simplicidade e,**principalmente**, portabilidade.
- **Testes Unitários:** Criei testes unitários utilizando Jest para garantir a integridade das funcionalidades principais.
- **Nodemon:** Utilizei o Nodemon para reiniciar automaticamente o servidor sempre que houver alterações no código.

## Premissas assumidas
1. Armazenamento de dados: Os pet shops  são salvos em um banco de dados para que possa utilizar melhor os conceitos de Rest API.
2. Hosting do site: Assumi que não é necessário fazer o hosting da aplicação e que rodar pelo terminal seria o suficiente.

## Decisões de projeto
1. Uso de Node.js e Express: para a facilitação do uso de javascript no projeto.
2. Uso do SQLite3: devido a sua facilidade de portabilidade.
3. Adição de novos pet shops: Estou assumindo que é necessário a adição de novos pet shops.
4. Jest para testes: escolhido por ser um framework de testes de fácil utilização e ter uma curva de aprendizado relativamente suave.
5. Uso do React: escolhida essa linguagem de programação, pois foi solicitado no pdf recebido.
6. Uso do nodemon: para que o servidor backend automaticamente atualize quando existir alguma atualização.
7. Uso do Vite: para que o servidor frontend automaticamente atualize quando existir alguma atualização.
8. Uso do Concurrently: para que o servidor backend e frontend rodem simultaneamente.

## Instalação

Antes de executar o projeto, certifique-se de ter o Node.js instalado em sua máquina.
1. **Link para instalação do npm: https://nodejs.org/en/download**
2. **Clone este repositório e entre na pasta:**

    ```bash
    git clone https://github.com/NilsonDeon/teste-dti.git
    cd teste-dti
    ```

2. **Instale as dependências:**

    ```bash
    cd backend
    npm i jest nodemon express sqlite3 cors

    cd ../frontend
    npm i
    ```

## Executando o Projeto

Certifique-se de ter o banco de dados SQLite instalado. O arquivo do banco de dados (`db.sqlite`) será criado automaticamente quando o projeto for executado pela primeira vez.

Para rodar os testes, faça: 

```bash
cd ../backend
npm run test
```

Para iniciar o servidor e executar a aplicação, utilize o seguinte comando:

```bash
cd frontend
npm start
```
Ele é acessado pelo link: http://localhost:5173/
