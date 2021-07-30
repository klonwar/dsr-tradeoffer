<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## DSR-TradeOffer | Backend

Сделано с использованием NestJS

## Установка

```bash
$ npm install
```

## Настройка

Нужно передать переменную среды `JWT_SECRET_TOKEN`. Удобно сделать это, создав файл `.env` и написав в него следующее:

```dotenv
JWT_SECRET_TOKEN=your_secret_token_here
```

Но вы можете обойтись и без этого. Например, запустить все через докер, настроив в его конфигурации нужный параметр

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
