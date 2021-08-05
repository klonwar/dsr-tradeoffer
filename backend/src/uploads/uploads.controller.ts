import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { GetImageParamsDto } from '#src/uploads/dto/get-image-params.dto';
import { Public } from '#src/auth/decorators/public.decorator';
import * as path from 'path';

@Controller(`uploads`)
export class UploadsController {
  @Public()
  @Get(`:image`)
  getImage(@Param() params: GetImageParamsDto): StreamableFile {
    const file = createReadStream(path.join(`uploads`, params.image));
    return new StreamableFile(file);
  }
}
