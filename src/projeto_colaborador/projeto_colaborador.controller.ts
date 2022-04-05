import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { util } from 'src/util/controller.util';
import { projeto_colaborador } from './projeto_colaborador.entity';
import { projeto_colaboradorService } from './projeto_colaborador.service';

@Controller('projeto_colaborador')
export class Projeto_colaboradorController {
    constructor(private projeto_colaboradorService:projeto_colaboradorService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: util.sumario.findAll('projeto_colaborador') })
    findAll(): Promise<projeto_colaborador[]> {
        return this.projeto_colaboradorService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: util.sumario.findById('ProjetoColaborador') })
    @ApiBearerAuth('access-token')
    async find(@Param('id', ParseIntPipe) id: number): Promise<projeto_colaborador> {
        return this.projeto_colaboradorService.find(id)
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: util.sumario.post('ProjetoColaborador'), description: `Segue informações dos seguintes campos \n + nome: obrigatório, único e mínimo 8 dígitos \n + descricao: opcional e valor padrão é o "" \n + inicio: obrigatorio \n + fim: É opcional e o valor padrão é null \n + ativo: é opcional e o valor padrão é true \n + colaboraderes: é um Array opcional, valor padrão é []. Nele não pode registar colaboradores que estejam em outro projeto ativo que que faça interseção de datas \n \nA parâmetro cascade está habilitado, caso envie o colaborador dentro de um array existem as seguintes situações: \n +  1 - Se enviar no corpo da requisição os dados de colaborador sem o ID irá criar novo colaborador e vincular ao projeto. \n +  2 - Se enviar com ID + o corpo do colaborador, irá atualizar os dados do colaborador do ID e vincular ao projeto. \n + 3 - Se informar somente o ID do colaborador, ele irá buscar um existente para vincular ao projeto. \n` })
    async create(@Body(ValidationPipe) body: projeto_colaborador): Promise<projeto_colaborador> {
        return this.projeto_colaboradorService.create(body)
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: util.sumario.update('ProjetoColaborador'), description: `Segue informações dos seguintes campos: \n + nome: obrigatório, único e mínimo 8 dígitos \n + descricao: opcional e valor padrão é o "" \n + inicio: obrigatorio \n + fim: É opcional e o valor padrão é null \n + ativo: é opcional e o valor padrão é true \n + colaboraderes: é um Array opcional, valor padrão é []. Nele não pode registar colaboradores que estejam em outro projeto ativo que que faça interseção de datas \n \nA parâmetro cascade está habilitado, caso envie o colaborador dentro de um array existem as seguintes situações: \n +  1 - Se enviar no corpo da requisição os dados de colaborador sem o ID irá criar novo colaborador e vincular ao projeto. \n +  2 - Se enviar com ID + o corpo do colaborador, irá atualizar os dados do colaborador do ID e vincular ao projeto. \n + 3 - Se informar somente o ID do colaborador, ele irá buscar um existente para vincular ao projeto. \n` })
    udpate(@Param('id', ParseIntPipe) id: number, @Body() body: projeto_colaborador) {
        return this.projeto_colaboradorService.update(id, body);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: util.sumario.delete('projeto_colaborador') })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.projeto_colaboradorService.delete(id);
    }
}
