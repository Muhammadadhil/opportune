

FROM node:20.9.0-alpine

WORKDIR /app    

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3020

CMD ["npm", "run" , "dev"]