import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Event } from 'src/categorys/interfaces/category.interface';
import { Player } from 'src/players/interfaces/player.interface';

export type CategoryDocument = Category & Document;

@Schema({
  collection: 'categorys',
  timestamps: true,
})
export class Category {
  @Prop({
      unique: true
  })
  category: string;

  @Prop()
  description: string;

  @Prop()
  events: Event[];

  @Prop({
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player'}]
  })
  players: Player[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
