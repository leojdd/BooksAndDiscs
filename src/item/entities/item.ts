import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ItemDocument {
  @Prop()
  public name: string;

  @Prop()
  public description: string;

  @Prop()
  public createdAt: Date;

  @Prop()
  public shelf: string;

  @Prop({ default: 0 })
  public type: 'DISC' | 'BOOK';

  constructor(props: Item) {
    Object.assign(this, props);
  }
}

export type Item = ItemDocument & Document;

export const itemSchema = SchemaFactory.createForClass(ItemDocument);
