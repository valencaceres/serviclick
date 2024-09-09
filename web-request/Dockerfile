# Etapa de compilación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package.json ./

# Instalar las dependencias necesarias para la compilación
RUN yarn install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN yarn build

# Eliminar dependencias de desarrollo
RUN yarn install --production --frozen-lockfile

# Eliminar archivos innecesarios después de la compilación, pero mantener yarn.lock
RUN rm -rf node_modules \
    && yarn install --production --frozen-lockfile \
    && rm -rf .next/cache src/ test/ docs/ .git/ .github/ scripts/ tmp/ \
    && rm -rf node_modules/.cache

# Etapa de producción
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de compilación
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Instalar las dependencias de producción
RUN yarn install --production --frozen-lockfile

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3028

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
