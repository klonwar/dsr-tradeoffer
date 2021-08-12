export class ItemDto {
  id: number;
  name: string;
  description: string;
  geo: string;
  photos: Array<{ photoPath: string }>;
  item_category: string;
  trade_category: string;
}
