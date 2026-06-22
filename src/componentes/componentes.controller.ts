import { Controller, Get, Post } from '@nestjs/common';
import { ComponentesService } from './componentes.service';

@Controller('componentes')
export class ComponentesController {
  constructor(private readonly componentesService: ComponentesService) {}

  @Get()
  async obtenerComponentes() {
    const componentes = await this.componentesService.obtenerComponentes();

    return {
      cantidad: componentes.length,
      componentes,
    };
  }

  @Post('prueba')
  async insertarComponentePrueba() {
    const componente = await this.componentesService.insertarComponentePrueba();

    return {
      mensaje: 'Componente insertado correctamente con Mongoose',
      componente,
    };
  }
}
