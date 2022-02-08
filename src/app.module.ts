import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetoModule } from './modules/projeto.module';
import { ColaboradorModule } from './modules/colaborador.module';
import { UsuarioModule } from './modules/usuario.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProjetoModule,
    ColaboradorModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
