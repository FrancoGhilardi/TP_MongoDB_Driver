import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Componente, ComponenteDocument } from './schemas/componente.schema';

@Injectable()
export class ComponentesService {
  constructor(
    @InjectModel(Componente.name)
    private readonly componenteModel: Model<Componente>,
  ) {}

  async insertarComponentePrueba(): Promise<ComponenteDocument> {
    return this.componenteModel.create({
      nombre: 'Sensor Ultrasónico',
      stock: 10,
    });
  }

  async obtenerComponentes(): Promise<ComponenteDocument[]> {
    return this.componenteModel.find().exec();
  }
}
