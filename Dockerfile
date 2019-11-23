FROM node:lts-alpine

WORKDIR /simple-express-api

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "build/server.js" ]
