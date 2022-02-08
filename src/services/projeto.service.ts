import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Projeto } from '../entities/Projeto.entity';

@Injectable()
export class ProjetoService {
    constructor(@InjectRepository(Projeto) private readonly model: Repository<Projeto>) { }
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

    async create(body: Projeto) {
        body.nome = body.nome.toLocaleUpperCase()
        const taskCreated = this.model.save(body);
        return taskCreated;
    }

    async update(id: number, body: Projeto) {
        if (await this.find(id)) {
            body.nome = body.nome.toLocaleUpperCase()
            const colaboradores = body.colaboradores.map(valor => valor.id);
            const result =
                await createQueryBuilder('projeto_colaboradores_colaborador', 'pcc') // Filtrando a tabela ManyToMany
                    .innerJoin('colaborador', 'c')
                    .innerJoinAndSelect('projeto', 'p')
                    .where('c.id = pcc_colaboradorId')
                    .andWhere('p_ativo = true')       // ON do inner join
                    .andWhere('p_id = pcc_projetoId') // ON do inner join
                    .andWhere(':data between p.inicio and p.fim ', { data: body.inicio }) // Filtra se a data do projeto corrente é está entre a data de algum projeto em andamento
                    .andWhere('pcc_colaboradorId in (:...colaboradores)', { colaboradores: colaboradores }) // Lista de colaboradores que irá chegar do front-end
                    .andWhere('pcc_projetoId <> :id', { id: id }) // Não filtrar pelo mesmo projeto
                    .getRawMany()
            if (!!result.length) { // Se for encontrado mais de 1 registro não é para cadastrar               
                throw new HttpException("Não pode fazer associar colaboradores que já estão presentes em outros projetos ativos", 500)
            }
            else {
                body.id = id;
                //await this.model.update({ id: id }, body)       // Estava dando erro ao fazer o update, foi trocado pelo save
                try {
                    await this.model.save(body)                       // Aqui eu sobreponho a tabela com as alterações que devem ser também validadas no front-end
                    return "Sucesso ao alterar a tarefa do id: " + id;
                }
                catch (e) {
                    console.log(e)
                    throw new HttpException('Ocorreu algum erro durante a atualização do dados por favor verificar o log', 500);
                }
            }
        }
        else {
            throw new HttpException('Não encontramos um projeto com esse id: ' + id, 500)
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            await this.model.delete({ id: id })
            return true
        }
        else {
            throw new NotFoundException(`Não foi possível excluir o projeto: ${id}`)
        }
    }
}