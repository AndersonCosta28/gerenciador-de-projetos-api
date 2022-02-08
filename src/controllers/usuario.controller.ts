import { UsuarioService } from 'src/services/usuario.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';





@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService:UsuarioService){}
    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
    @Get(':id')
    async find(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.find(id)
    }
    @Post()
    async create(@Body() body: Usuario): Promise<Usuario> {
        return this.usuarioService.create(body)
    }
    @Put(':id')
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Usuario) {
        return this.usuarioService.update(id, body);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.delete(id);
    }
}
