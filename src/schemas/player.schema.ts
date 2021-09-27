import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({
  collection: 'players',
  timestamps: true,
})
export class Player {
  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  ranking: string;

  @Prop()
  position: number;

  @Prop()
  urlPhoto: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
