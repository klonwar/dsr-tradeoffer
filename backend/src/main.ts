require(`dotenv`).config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3001;

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(
    `Application is running on: ${(await app.getUrl()).replace(
      `[::1]`,
      `localhost`,
    )}`,
  );
})();
