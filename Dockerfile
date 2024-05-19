FROM node:18-alpine

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npx prisma generate

# RUN npx prisma migrate deploy

EXPOSE 8080

CMD [ "npm", "run", "start" ]