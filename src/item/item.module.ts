import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './repositories/item.repository';
import { itemSchema } from './entities/item';
import { ItemService } from './services/item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemRepository, ItemService],
  exports: [],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item',
        schema: itemSchema,
      },
    ])
  ],
})
export class ItemModule {}
