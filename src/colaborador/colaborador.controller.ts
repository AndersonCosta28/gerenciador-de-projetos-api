import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Colaborador } from './colaborador.entity';
import { ColaboradorService } from './colaborador.service';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private colaboradorService: ColaboradorService){}

    @Get()
    findAll(): Promise<Colaborador[]> {
        return this.colaboradorService.findAll();
    }
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Colaborador> {
        return this.colaboradorService.find(id)
    }
    @Post()
    async create(@Body() body: Colaborador): Promise<Colaborador> {
        return this.colaboradorService.create(body)
    }
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Colaborador) {
        return this.colaboradorService.update(id, body);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.colaboradorService.delete(id);
    }
}
