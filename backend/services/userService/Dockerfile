FROM node:20.9.0-alpine

WORKDIR /app/services/userService

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]