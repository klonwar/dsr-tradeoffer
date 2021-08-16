import { IsIn, IsOptional, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class LoadCatalogueDto {
  @Type(() => String)
  @Transform(({ value }) => parseInt(value))
  @IsPositive({ message: `Введите корректную страницу` })
  @IsOptional()
  page?: number;

  @IsOptional()
  @IsIn([`id`, `name`])
  order?: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsIn([`asc`, `desc`])
  @IsOptional()
  orderDirection?: string;

  @IsOptional()
  query?: string;
}
