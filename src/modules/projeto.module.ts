import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjetoController} from '../controllers/projeto.controller';

import { Projeto } from '../entities/Projeto.entity';
import { ProjetoService } from '../services/projeto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Projeto])
    ],
    controllers: [ProjetoController],
    providers: [ProjetoService]
})
export class ProjetoModule {}
