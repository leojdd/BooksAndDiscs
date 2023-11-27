export class CreateItemDTO {
  name: string;
  description: string;
  shelf: string;
  type: 'DISC' | 'BOOK';
}
