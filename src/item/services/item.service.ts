import { Injectable, Logger } from '@nestjs/common';

import { CreateItemDTO } from '../dto/create-item.dto';
import { ItemRepository } from '../repositories/item.repository';
import { DeleteItemDTO } from '../dto/delete-item.dto.ts';
import { ListItemDTO } from '../dto/list-item.dto';
import { Item } from '../entities/item';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    private readonly itemRepository: ItemRepository
  ) {}

  async create(createItemDTO: CreateItemDTO): Promise<string> {
    try {
      await this.itemRepository.create({
        name: createItemDTO.name,
        description: createItemDTO.description,
        shelf: createItemDTO.shelf,
        type: createItemDTO.type,
        createdAt: new Date()
      })
      return `Your ${createItemDTO.type.toLowerCase()} was created`
    } catch (err) {
      this.logger.error(err);
      return 'Erro at try create your item'
    }
  }

  async delete(deleteItemDTO: DeleteItemDTO): Promise<string> {
    try {
      await this.itemRepository.delete(deleteItemDTO.id)
      return `Your item was deleted`
    } catch (err) {
      this.logger.error(err);
      return 'Erro at try delete your item'
    }
  }

  async list(listItemDTO: ListItemDTO): Promise<Array<Item>> {
    return await this.itemRepository.find(listItemDTO.name, listItemDTO.description, listItemDTO.shelf, listItemDTO.type)
  }
}
