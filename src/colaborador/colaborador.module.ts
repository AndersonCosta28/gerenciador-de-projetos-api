import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorController } from './colaborador.controller';
import { Colaborador } from './colaborador.entity';
import { ColaboradorService } from './colaborador.service';

@Module({
    imports: [TypeOrmModule.forFeature([Colaborador])],
    controllers: [ColaboradorController],
    providers: [ColaboradorService],
    exports: [ColaboradorService]
})
export class ColaboradorModule {}
