import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ComponenteDocument = HydratedDocument<Componente>;

@Schema({
  timestamps: true,
  collection: 'componentes',
})
export class Componente {
  @Prop({
    type: String,
    required: true,
  })
  nombre!: string;

  @Prop({
    type: Number,
  })
  stock?: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const ComponenteSchema = SchemaFactory.createForClass(Componente);
