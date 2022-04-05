import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProjetoController} from './projeto.controller';

import { Projeto } from './Projeto.entity';
import { ProjetoService } from './projeto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Projeto])
    ],
    controllers: [ProjetoController],
    providers: [ProjetoService],
    exports: [ProjetoService]
})
export class ProjetoModule {}
