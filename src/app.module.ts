import { Projeto_colaboradorModule } from './projeto_colaborador/projeto_colaborador.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetoModule } from './projeto/projeto.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { UsuarioModule } from './usuario/usuario.module';
@Module({
  imports: [    
    AuthModule,
    TypeOrmModule.forRoot(),
    Projeto_colaboradorModule,
    ProjetoModule,
    ColaboradorModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
