import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from '#src/auth/auth.service';
import { Public } from '#src/auth/decorators/public.decorator';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller(`auth`)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(`login`)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post(`register`)
  @UseInterceptors(
    FileInterceptor(`photo`, {
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
    }),
  )
  async register(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.register({
      ...createUserDto,
      photoPath: photo?.path,
    });
  }
}
