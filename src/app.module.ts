import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { SensoresModule } from './sensores/sensores.module';
import { ComponentesModule } from './componentes/componentes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión utilizada en la Parte 1:
    MongodbModule,

    // Conexión de Mongoose utilizada en la Parte 2:
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');

        const databaseName = configService.get<string>('MONGODB_DATABASE');

        if (!uri) {
          throw new Error('La variable MONGODB_URI no está configurada');
        }

        if (!databaseName) {
          throw new Error('La variable MONGODB_DATABASE no está configurada');
        }

        return {
          uri,
          dbName: databaseName,
        };
      },
    }),

    SensoresModule,

    ComponentesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
