import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetoModule } from './projeto/projeto.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { UsuarioModule } from './usuario/usuario.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProjetoModule,
    ColaboradorModule,
    UsuarioModule
  ],
  controllers: [AppController ],
  providers: [AppService ],
})
export class AppModule {}
