import { Projeto_colaboradorController } from './projeto_colaborador.controller';
import { projeto_colaboradorService } from './projeto_colaborador.service';

import { Module } from '@nestjs/common';
import { projeto_colaborador } from './projeto_colaborador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorModule } from 'src/colaborador/colaborador.module';
import { ProjetoModule } from 'src/projeto/projeto.module';

@Module({
    imports: [TypeOrmModule.forFeature([projeto_colaborador]), ColaboradorModule, ProjetoModule],
    controllers: [
        Projeto_colaboradorController,],
    providers: [
        projeto_colaboradorService,],
})
export class Projeto_colaboradorModule { }
