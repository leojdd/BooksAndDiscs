import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from '../entities/item';
import { EditItemDTO } from '../dto/edit-item.dto';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<Item>,
  ) {}

  async create(itemDocument: ItemDocument): Promise<Item> {
    return await this.itemModel.create(itemDocument);
  }

  async find(name: string, description: string, shelf: string, type: 'DISC' | 'BOOK'): Promise<Array<Item>> {
    let query = { }

    if (name) {
      Object.assign(query, { name: { '$regex': name, $options: 'i' } })
    }

    if (description) {
      Object.assign(query, { description: { '$regex': description, $options: 'i' } })
    }

    if (shelf) {
      Object.assign(query, { shelf: { '$regex': shelf, $options: 'i' } })
    }

    if (type) {
      Object.assign(query, { type: type })
    }

    return await this.itemModel.find(query);
  }

  async delete(id: string): Promise<void> {
    await this.itemModel.deleteOne({ _id: id });
  }

  async updateOne(editItemDTO: EditItemDTO): Promise<boolean> {
    let obj = await this.itemModel.findByIdAndUpdate(
      {
        _id: editItemDTO.id
      },
      {
        $set:
        {
          name: editItemDTO.name,
          description: editItemDTO.description,
          shelf: editItemDTO.shelf,
          type: editItemDTO.type
        }
      }
    )

    return obj != null
  }
}
