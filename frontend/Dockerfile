FROM node:12.18.2

WORKDIR /usr/src/app/frontend/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "run", "start" ]