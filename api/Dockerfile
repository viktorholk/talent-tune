FROM node:20.11.0

WORKDIR /api

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm test

EXPOSE 3001

CMD ["npm", "run", "start:prod"]

