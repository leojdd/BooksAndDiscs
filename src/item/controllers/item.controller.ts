import { Body, Controller, Delete, Put, Get, Query } from '@nestjs/common';

import { ItemService } from '../services/item.service';
import { CreateItemDTO } from '../dto/create-item.dto';
import { DeleteItemDTO } from '../dto/delete-item.dto.ts';
import { ListItemDTO } from '../dto/list-item.dto';
import { Item } from '../entities/item';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Put('create')
  async create(@Body() createItemDTO: CreateItemDTO): Promise<string> {
    return await this.itemService.create(createItemDTO);
  }

  @Delete('delete')
  async delete(@Body() deleteItemDTO: DeleteItemDTO): Promise<string> {
    return await this.itemService.delete(deleteItemDTO);
  }

  @Get('list')
  async list(@Query() params: any): Promise<Array<Item>> {
    return await this.itemService.list({
      description: params.description,
      name: params.name,
      shelf: params.shelf,
      type: params.type
    });
  }
}
