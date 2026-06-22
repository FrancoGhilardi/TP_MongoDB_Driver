import { Controller, Get, Post } from '@nestjs/common';
import { SensoresService } from './sensores.service';

@Controller('sensores')
export class SensoresController {
  constructor(private readonly sensoresService: SensoresService) {}

  @Get()
  async obtenerSensores() {
    const sensores = await this.sensoresService.obtenerSensores();

    return {
      cantidad: sensores.length,
      sensores,
    };
  }

  @Post('cargar-iniciales')
  async cargarSensoresIniciales() {
    const resultado = await this.sensoresService.insertarSensores();

    return {
      mensaje: 'Sensores insertados correctamente',
      cantidadInsertada: resultado.insertedCount,
      idsInsertados: Object.values(resultado.insertedIds).map((id) =>
        id.toHexString(),
      ),
    };
  }
}
