import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComponentesController } from './componentes.controller';
import { ComponentesService } from './componentes.service';
import { Componente, ComponenteSchema } from './schemas/componente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Componente.name,
        schema: ComponenteSchema,
      },
    ]),
  ],
  controllers: [ComponentesController],
  providers: [ComponentesService],
})
export class ComponentesModule {}
