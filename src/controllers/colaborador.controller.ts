import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { util } from 'src/util/controller.util';
import { Colaborador } from '../entities/colaborador.entity';
import { ColaboradorService } from '../services/colaborador.service';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private colaboradorService: ColaboradorService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth('access-token') // Aqui ele irá aceitar o TOKEN que iremos configurar no Swagger UI, o nome é o segundo parâmetro do .addBearerAuth
    @ApiOperation({ summary: util.sumario.findAll('colaborador') })
    findAll(): Promise<Colaborador[]> {
        return this.colaboradorService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: util.sumario.findById('colaborador'), description: `Segue informações dos seguintes campos: \n + nome: obrigatório e mínimo 8 dígitos \n + cargo: obrigatorio e mínimo 4 dígitos \n + admissao: obrigatorio \n + ativo: opcional e valor padrão é true`})
    @ApiBearerAuth('access-token') // Aqui ele irá aceitar o TOKEN que iremos configurar no Swagger UI, o nome é o segundo parâmetro do .addBearerAuth
    async find(@Param('id', ParseIntPipe) id: number): Promise<Colaborador> {
        return this.colaboradorService.find(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: util.sumario.post('colaborador') })
    @ApiBearerAuth('access-token') // Aqui ele irá aceitar o TOKEN que iremos configurar no Swagger UI, o nome é o segundo parâmetro do .addBearerAuth
    async create(@Body() body: Colaborador): Promise<Colaborador> {
        return this.colaboradorService.create(body)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiOperation({ summary: util.sumario.update('colaborador'), description: `Segue informações dos seguintes campos: \n + nome: obrigatório e mínimo 8 dígitos \n + cargo: obrigatorio e mínimo 4 dígitos \n + ativo: opcional e valor padrão é true`})
    @ApiBearerAuth('access-token') // Aqui ele irá aceitar o TOKEN que iremos configurar no Swagger UI, o nome é o segundo parâmetro do .addBearerAuth
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: Colaborador) {
        return this.colaboradorService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: util.sumario.delete('colaborador') })
    @ApiBearerAuth('access-token') // Aqui ele irá aceitar o TOKEN que iremos configurar no Swagger UI, o nome é o segundo parâmetro do .addBearerAuth
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.colaboradorService.delete(id);
    }
}