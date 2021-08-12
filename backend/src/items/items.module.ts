import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '#src/items/entity/item.entity';
import { PhotoEntity } from '#src/photos/entity/photo.entity';
import { CategoryEntity } from '#src/items/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity, PhotoEntity, CategoryEntity]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
