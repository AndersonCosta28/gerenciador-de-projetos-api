import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Colaborador } from '../entities/colaborador.entity';
import { ColaboradorService } from '../services/colaborador.service';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private colaboradorService: ColaboradorService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Colaborador[]> {
        return this.colaboradorService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Colaborador> {
        return this.colaboradorService.find(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: Colaborador): Promise<Colaborador> {
        return this.colaboradorService.create(body)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Colaborador) {
        return this.colaboradorService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.colaboradorService.delete(id);
    }
}
