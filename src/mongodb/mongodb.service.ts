import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongodbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongodbService.name);
  private readonly client: MongoClient;
  private readonly database: Db;

  constructor(private readonly configService: ConfigService) {
    const uri = this.configService.get<string>('MONGODB_URI');
    const databaseName = this.configService.get<string>('MONGODB_DATABASE');

    if (!uri) {
      throw new Error('La variable MONGODB_URI no está configurada');
    }

    if (!databaseName) {
      throw new Error('La variable MONGODB_DATABASE no está configurada');
    }

    this.client = new MongoClient(uri);
    this.database = this.client.db(databaseName);
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();

    // Comprueba que MongoDB responda correctamente.
    await this.database.command({ ping: 1 });

    this.logger.log(
      `Conexión establecida con la base de datos "${this.database.databaseName}"`,
    );
  }

  getDatabase(): Db {
    return this.database;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.close();
    this.logger.log('Conexión con MongoDB cerrada');
  }
}
