import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usuarioService.findOne(username);
        if (user &&  await bcrypt.compare(pass, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.usuario, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}