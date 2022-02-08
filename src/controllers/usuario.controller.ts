import { UsuarioService } from 'src/services/usuario.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.find(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: Usuario): Promise<Usuario> {
        return this.usuarioService.create(body)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Usuario) {
        return this.usuarioService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.delete(id);
    }
}
