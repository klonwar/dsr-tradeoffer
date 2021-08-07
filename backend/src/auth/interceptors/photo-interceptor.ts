import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const PhotoInterceptor = (name = `photo`) =>
  FileInterceptor(name, {
    storage: diskStorage({
      destination: `./uploads/`,
      filename(req, file, callback) {
        callback(null, `${uuidv4()}${extname(file.originalname)}`);
      },
    }),
    fileFilter(req, file, callback) {
      const isImage =
        [`image/jpeg`, `image/png`].includes(file.mimetype) &&
        (file.originalname.endsWith(`.jpg`) ||
          file.originalname.endsWith(`.png`));
      if (isImage) {
        callback(null, true);
        return;
      }

      callback(
        new BadRequestException(
          `Фотография должна быть картинкой в .jpg или .png`,
        ),
        false,
      );
    },
  });
