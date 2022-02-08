import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Projeto } from '../entities/Projeto.entity';
import { ProjetoService } from '../services/projeto.service';

@Controller('projeto')
export class ProjetoController {
    constructor(private projetoService: ProjetoService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Projeto[]> {
        return this.projetoService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Projeto> {
        return this.projetoService.find(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: Projeto): Promise<Projeto> {
        return this.projetoService.create(body)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Projeto) {
        return this.projetoService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projetoService.delete(id);
    }
}
