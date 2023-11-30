FROM node:18-alpine
RUN apk add --no-cache tzdata
ENV TZ=America/Santiago

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package.json yarn.lock ./
COPY .env /app/dist/

# Instalar las dependencias y construir la aplicación
RUN yarn install


COPY . .

RUN yarn build

RUN apk update && apk upgrade --no-cache libcrypto3 libssl3

# Directorio de trabajo en el contenedor
WORKDIR /app/dist

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3019

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
