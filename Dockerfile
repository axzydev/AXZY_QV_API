FROM node:16-alpine AS builder
 
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

#COPY env file
COPY --from=builder /app/.env ./

EXPOSE 4000

CMD [ "npm", "run", "start" ]