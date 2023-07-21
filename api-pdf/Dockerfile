FROM node:16-alpine
RUN apk add --no-cache tzdata
ENV TZ=America/Santiago

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package.json yarn.lock ./
COPY .env /app/dist/
COPY ./src/fonts/*.* /app/dist/fonts/
COPY ./img/logo.jpg /app/dist/img/

# Instalar las dependencias y construir la aplicación
RUN yarn install


COPY . .

RUN yarn build

# Directorio de trabajo en el contenedor
WORKDIR /app/dist

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3007

# Comando para iniciar la aplicación
CMD ["node", "server.js"]