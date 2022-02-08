import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from '../entities/colaborador.entity';

@Injectable()
export class ColaboradorService {
    constructor(@InjectRepository(Colaborador) private readonly model: Repository<Colaborador>) { }
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

    async create(body: Colaborador) {
        body.nome = body.nome.toLocaleUpperCase()
        body.cargo = body.cargo.toLocaleUpperCase()
        const taskCreated = this.model.save(body);
        return taskCreated;
    }

    async update(id: number, body: Colaborador) {
        if (await this.find(id)) {
            body.id = id;
            body.nome = body.nome.toLocaleUpperCase()
            body.cargo = body.cargo.toLocaleUpperCase()
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
            throw new NotFoundException(`Não foi possível excluir o colaborador: ${id}`)
        }
    }
}
