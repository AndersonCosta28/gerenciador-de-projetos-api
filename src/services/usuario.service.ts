import { Injectable, NotFoundException } from '@nestjs/common';
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
            throw new NotFoundException('Não achamos o ID: ' + id);
        }
    }

    async create(body: Usuario) {
        const taskCreated = this.model.save(body);
        return taskCreated;
    }

    async update(id: number, body: Usuario) {
        if (await this.find(id)) {
            body.id = id;
            console.log(body)
            await this.model.update({ id: id }, body)
            return "Sucesso ao alterar a tarefa do id: " + id;
        }
        else {
            throw new NotFoundException('Deu ruim')
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            await this.model.delete({ id: id })
            return true
        }
        else {
            throw new NotFoundException(`Não foi possível excluir o usuario: ${id}`)
        }
    }
}
