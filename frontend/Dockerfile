# build context must be `dsr-tradeoffer` directory

FROM node:14.16.1

EXPOSE 3002

WORKDIR /usr/src/app/frontend

# build frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

# copy common files from backend

COPY ./backend/package*.json ../backend/

RUN npm install --prefix ../backend

COPY ./backend/common ../backend/common

# start container

CMD [ "npm", "run", "start" ]