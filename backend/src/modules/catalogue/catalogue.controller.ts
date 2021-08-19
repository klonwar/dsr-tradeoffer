import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CatalogueService } from '#src/modules/catalogue/catalogue.service';
import { Roles } from '#src/modules/auth/decorators/roles.decorator';
import { UserRole } from '#server/common/enums/user-role.enum';
import { LoadCatalogueDto } from '#server/common/dto/load-catalogue.dto';
import { CatalogueDto } from '#server/common/dto/catalogue.dto';

@Controller(`catalogue`)
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async getItemsList(@Query() query: LoadCatalogueDto): Promise<CatalogueDto> {
    return await this.catalogueService.getItemsList(query);
  }

  @Delete(`/item/:id`)
  @Roles(UserRole.ADMIN)
  async deleteCatalogueItem(@Param(`id`, ParseIntPipe) id: number) {
    return await this.catalogueService.deleteCatalogueItem(id);
  }
}
