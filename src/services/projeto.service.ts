import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Projeto } from '../entities/projeto.entity';

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
            throw new HttpException('Não encontramos um projeto com esse ID: ' + id, 500);
        }
    }

    async create(body: Projeto) {
        try {
            this.validarData(body);
            const NovoProjeto = this.model.create(body); // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530            
            return await this.model.save(NovoProjeto);
        }
        catch (e) {
            if (e.errno == 19)
                throw new HttpException('Já existe um registro com esse nome de projeto', 500)
            else
                throw e
        }
    }

    async update(id: number, body: Projeto) {
        if (await this.find(id)) {
            try {
                body.id = id; // Para não dar erro de UNIQUE na hora de gravar no banco
                this.validarData(body) // Verifica se a data de inicio é menor que a data de inicio
                await this.validarColaboradoresPresenteEmOutrosProjetos(body, id) // Verifica se os colaboradores enviados estão presentes em outros projetos no mesmo período
                const projetoAtualizado = await this.model.create(body) // Instancia o objeto para ativar os gatilhos no ENTITY
                await this.model.save(projetoAtualizado)                   // Aqui eu sobreponho o registro com as alterações enviadas pelo front-end
                return "Sucesso ao alterar a tarefa do id: " + id;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            throw new HttpException('Não encontramos um projeto com esse ID: ' + id, 500)
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            return !!(await this.model.delete({ id: id })).affected // retorna linha afetadas, caso 0 será false, caso diferente de 0 é true
        }
        else {
            throw new HttpException(`Não foi possível excluir o projeto do ID: ${id}`, 500)
        }
    }


    /*Aqui abaixo existirão funções de validações de dados*/



    validarData(body: Projeto) {
        if (body.fim !== undefined && body.inicio > body.fim) // Se o usuario fornecedor a data de fim, ela não pode ser inferior a data de inicio
            throw new HttpException('A data de fim não pode ser inferior a data de inicio', 500);
    }

    async validarColaboradoresPresenteEmOutrosProjetos(body: Projeto, id: number): Promise<void> {
        const colaboradores = body.colaboradores == undefined ? [] : body.colaboradores.map(valor => valor.id); // Lista de colaboradores que recebemos do front-end para atualizar no projeto
        const result =
            await createQueryBuilder('projeto_colaboradores_colaborador', 'pcc') // Filtrando a tabela ManyToMany
                .innerJoinAndSelect('colaborador', 'c')
                .innerJoinAndSelect('projeto', 'p')
                .where('c.id = pcc_colaboradorId')// ON do inner join
                .andWhere('p_id = pcc_projetoId') // ON do inner join
                .andWhere('p_ativo = true')
                .andWhere('c_ativo = true')
                .andWhere("date(:data) between date(p.inicio) and ifnull(fim,date('now'))", { data: body.inicio }) // Filtra se a data do projeto corrente é está entre a data de algum projeto em andamento
                .andWhere('pcc_colaboradorId in (:...colaboradores)', { colaboradores: colaboradores }) // Lista de colaboradores que irá chegar do front-end
                .andWhere('pcc_projetoId <> :id', { id: id }) // Não filtrar pelo mesmo projeto
                .getRawMany();

        if (!!result.length) { // Se for encontrado mais de 1 registro não é para atualizar 
            const ColaboradoresJaPresentesEmOutrosProjetos = result.map(value => value['c_nome']) // Pegar o nome de todos os colaboradores que já estão presentes em um projeto para devolver para o front-end
            throw new HttpException(`Não pode fazer associar colaboradores que já estão presentes em outros projetos ativos. São estes: ${ColaboradoresJaPresentesEmOutrosProjetos}`, 500)
        }
    }
}