FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3038

CMD ["yarn", "start"]