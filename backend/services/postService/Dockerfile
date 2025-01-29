FROM node:20.9.0-alpine

WORKDIR /app    

COPY package*.json ./

RUN npm install

ENV NODE_ENV=production

COPY . .

RUN npm run build

EXPOSE 3020

CMD ["npm", "start"]