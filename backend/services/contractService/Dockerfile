# Stage 1: Build
FROM node:20.9.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies for building
RUN npm ci                     

COPY . .

RUN npm run build   


# Stage 2: Production

FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

# Only install production dependencies
RUN npm ci --only=production   

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]

EXPOSE 3030