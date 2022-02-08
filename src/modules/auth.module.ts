import { AuthService } from './../services/auth.service';
import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
    imports: [UsuarioModule, PassportModule, JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '300s' } })],
    controllers: [],
    providers: [
        AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
