# Catálogo de Produtos

Este é um projeto de catálogo de produtos com frontend em TypeScript e backend em Java.

## Funcionalidades

- Listagem de produtos
- Adição de novos produtos
- Atualização de informações de produtos
- Remoção de produtos
- Validação para impedir entradas duplicadas
- Backend implementado com Java e Spring Boot

## Tecnologias Utilizadas

### Frontend

- **TypeScript**: Linguagem principal para o frontend.
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Axios**: Para requisições HTTP.
- **CSS Modules**: Estilização modularizada.

### Backend

- **Java**: Linguagem de programação para o backend.
- **Spring Boot**: Framework para criar aplicações Java.
- **Hibernate**: Para mapeamento objeto-relacional (ORM).
- **H2**: Banco de dados in memory utilizado para armazenar os produtos.

### Frontend

- Node.js >= 14.x
- npm >= 6.x

### Backend

- Java 11 ou superior
- Maven

## Como Executar o Projeto

## Backend

- mvn clean install: para compilar o projeto com Maven.
- mvn spring-boot:run: compile e execute o backend com Maven.
-http://localhost:8080/ a partir deste momento o endereço da porta do backend será este.

## Frontend

- npm install: para instalar as dependências.
- npm run dev: para iniciar o front.
- http://localhost:5173/ a partir deste momento o endereço da porta do frontend será este.
