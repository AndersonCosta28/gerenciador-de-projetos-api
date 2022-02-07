import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Projeto } from './Projeto.entity';
import { ProjetoService } from './projeto.service';

@Controller('projeto')
export class ProjetoController {
    constructor(private projetoService: ProjetoService) { }
    @Get()
    findAll(): Promise<Projeto[]> {
        return this.projetoService.findAll();
    }
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
        return this.projetoService.find(id)
    }
    @Post()
    async create(@Body() body: Projeto): Promise<Projeto> {
        return this.projetoService.create(body)
    }
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Projeto) {
        return this.projetoService.update(id, body);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projetoService.delete(id);
    }
}
