FROM node:alpine

LABEL org.opencontainers.image.source https://github.com/budgetbuddyde/mail-service

WORKDIR /usr/src/mail-service/

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]