import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private readonly model: Repository<Usuario>) { }
    async findAll() {
        return await this.model.find();
    }
    async find(id: number) {
        const resultado = await this.model.findOne({ where: { id: id } })
        if (!!resultado) {
            return resultado;
        }
        else {
            throw new HttpException('Não encontramos um usuario com esse ID: ' + id, 500);
        }
    }

    async create(body: Usuario) {
        try {
            const usuario = this.model.create(body) // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530
            const NovoUsuario = await this.model.save(usuario); // Eu uso o save com meu objeto instanciado
            return NovoUsuario;
        }
        catch (e) {
            console.log(e)
            throw new HttpException('Erro interno, verificar os logs', 500);
        }
    }

    async update(id: number, body: Usuario) {
        if (await this.find(id)) {
            body.id = id;
            const usuario = this.model.create(body);  // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530
            await this.model.save(usuario);
            //await this.model.update({ id: id }, body);
            return "Sucesso ao alterar a tarefa do id: " + id;
        }
        else {
            throw new HttpException('Não encontramos um usuario com esse ID:', 500)
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            await this.model.delete({ id: id })
            return true
        }
        else {
            throw new HttpException(`Não foi possível excluir o usuario do ID: ${id}`, 500)
        }
    }

    async findOne(username: string): Promise<Usuario> {
        return await this.model.findOne({ where: { usuario: username } });
    }
}
