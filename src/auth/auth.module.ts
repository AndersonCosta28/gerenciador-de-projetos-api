import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import * as dotenv from 'dotenv'
import { jwtConstants } from './constants';
dotenv.config({ path: __dirname + '/.env' })

@Module({
    imports: [UsuarioModule, PassportModule, JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '3600s' } })],
    controllers: [],
    providers: [
        AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
