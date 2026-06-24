FROM node:18-alpine3.16
 
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

COPY . .

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

RUN npm install

# RUN npx prisma generate

CMD ["./docker-entrypoint.sh"]