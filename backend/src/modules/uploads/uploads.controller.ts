import {
  Controller,
  Get,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { GetImageParamsDto } from '#src/modules/uploads/dto/get-image-params.dto';
import { Public } from '#src/modules/auth/decorators/public.decorator';
import * as path from 'path';

@Controller(`uploads`)
export class UploadsController {
  @Public()
  @Get(`:image`)
  async getImage(@Param() params: GetImageParamsDto): Promise<StreamableFile> {
    const filepath = path.join(`uploads`, params.image);
    // Файл не существует
    if (!(await fs.promises.stat(filepath).catch(() => false)))
      throw new NotFoundException(`Такой фотографии нет`);

    const file = createReadStream(filepath);
    return new StreamableFile(file);
  }
}
