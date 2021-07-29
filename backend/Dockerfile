FROM node:12.18.2

WORKDIR /usr/src/app/backend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]