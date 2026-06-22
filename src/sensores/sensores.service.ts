import { Injectable } from '@nestjs/common';
import { InsertManyResult, WithId } from 'mongodb';
import { MongodbService } from '../mongodb/mongodb.service';

export interface SensorRobotica {
  nombre: string;
}

@Injectable()
export class SensoresService {
  constructor(private readonly mongodbService: MongodbService) {}

  async insertarSensores(): Promise<InsertManyResult<SensorRobotica>> {
    const sensores: SensorRobotica[] = [
      {
        nombre: 'Sensor de Humedad',
      },
      {
        nombre: 'Servo Motor',
      },
      {
        nombre: 'LED RGB',
      },
    ];

    const database = this.mongodbService.getDatabase();

    const sensoresCollection = database.collection<SensorRobotica>('sensores');

    return sensoresCollection.insertMany(sensores);
  }

  async obtenerSensores(): Promise<WithId<SensorRobotica>[]> {
    const database = this.mongodbService.getDatabase();

    const sensoresCollection = database.collection<SensorRobotica>('sensores');

    return sensoresCollection.find().toArray();
  }
}
