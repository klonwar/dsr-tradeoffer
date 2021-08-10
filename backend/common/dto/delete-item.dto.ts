import { IsNotEmpty } from 'class-validator';

export class DeleteItemDto {
  @IsNotEmpty({ message: `Вам нужно указать id` })
  id: number;
}
