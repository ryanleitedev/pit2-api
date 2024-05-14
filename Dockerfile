# Usa a imagem oficial do Node.js
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /code

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código fonte para o diretório de trabalho
COPY . .

# Expõe a porta 3000 para permitir conexões externas
EXPOSE 3000

RUN ["npm", "start:prod"]