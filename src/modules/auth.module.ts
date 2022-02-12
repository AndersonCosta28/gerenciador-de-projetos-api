import { AuthService } from './../services/auth.service';
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

@Module({
    imports: [UsuarioModule, PassportModule, JwtModule.register({ secret: `${process.env.SECRECT}`, signOptions: { expiresIn: '3600s' } })],
    controllers: [],
    providers: [
        AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
