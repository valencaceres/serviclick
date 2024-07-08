FROM node:18-alpine

# Establecer la zona horaria
ENV TZ=America/Santiago
RUN apk add --no-cache tzdata

# Instalar herramientas de construcción necesarias para módulos nativos
RUN apk add --no-cache make gcc g++ python3

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de definición de paquetes y el archivo de entorno
COPY package.json yarn.lock ./
COPY .env /app/dist/

# Instalar las dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN yarn build

# Cambiar el directorio de trabajo al directorio de distribución
WORKDIR /app/dist

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3023

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
