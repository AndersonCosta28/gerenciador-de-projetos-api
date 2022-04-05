import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from './colaborador.entity';

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
            throw new HttpException('Não encontramos um colaborador com esse ID: ' + id, 500);
        }
    }

    async create(body: Colaborador) {
        try {
            const NovoColaborador = this.model.create(body); // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530 
            return await this.model.save(NovoColaborador);
        }
        catch (e) {
            console.log(e)
            throw new HttpException('Erro interno, verificar os logs', 500);
        }
    }

    async update(id: number, body: Colaborador) {
        if (await this.find(id)) {
            //await this.model.update({ id: id }, body) // Desabilitado por não ativar a gatilho
            body.id = id; // Para não dar erro de UNIQUE na hora de gravar no banco
            const colaboradorAtualizado = await this.model.create(body)
            await this.model.save(colaboradorAtualizado)
            return "Sucesso ao alterar a tarefa do id: " + id;
        }
        else {
            throw new HttpException('Não encontramos um colaborador com esse ID: ' + id, 500);
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            return !!(await this.model.delete({ id: id })).affected // retorna linha afetadas, caso 0 será false, caso diferente de 0 é true
        }
        else {
            throw new NotFoundException(`Não foi possível excluir o colaborador do ID: ${id}`)
        }
    }
}