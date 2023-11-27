export class EditItemDTO {
  id: string;
  name: string;
  description: string;
  shelf: string;
  type: 'DISC' | 'BOOK';
}
