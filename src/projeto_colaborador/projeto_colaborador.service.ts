import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColaboradorService } from 'src/colaborador/colaborador.service';
import { Projeto } from 'src/projeto/Projeto.entity';
import { ProjetoService } from 'src/projeto/projeto.service';
import { createQueryBuilder, Repository } from 'typeorm';
import { projeto_colaborador } from './projeto_colaborador.entity';
@Injectable()
export class projeto_colaboradorService {
    constructor(
        @InjectRepository(projeto_colaborador) private readonly model: Repository<projeto_colaborador>,
        private colaboradorService: ColaboradorService,
        private projetoService: ProjetoService) { }

    async findAll() {
        return await this.model.find();;
    }
    async find(id: number) {
        const resultado = await this.model.findOne({ where: { id: id } })
        if (!!resultado) {
            return resultado;
        }
        else {
            throw new HttpException('Não encontramos um projeto_colaborador com esse ID: ' + id, 500);
        }
    }

    async create(body: projeto_colaborador) {
        try {
            const result: any = body;
            const { colaboradorId, projetoId } = result
            await this.VerificaRegistroDuplicado(colaboradorId, projetoId)
            body.projeto = await this.projetoService.find(projetoId);
            await this.validarColaboradoresPresenteEmOutrosProjetos(colaboradorId, body.projeto)
            body.colaborador = await this.colaboradorService.find(colaboradorId);

            const ProjetoColaborador = this.model.create(body) // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530            
            return await this.model.save(ProjetoColaborador)// Eu uso o save com meu objeto instanciado
        }
        catch (e) {
            throw new HttpException(`Erro interno, verificar os logs. ${e}`, 500);
        }
    }

    async update(id: number, body: projeto_colaborador) {
        if (await this.find(id)) {
            const result: any = body;
            const { colaboradoresId, projetoId } = result
            body.projeto = await this.projetoService.find(projetoId);
            body.colaborador = await this.colaboradorService.find(colaboradoresId);
            await this.model.update({ id: id }, body) // Desabilitado por não ativar a gatilho
            body.id = id; // Para não dar erro de UNIQUE na hora de gravar no banco
            const projeto_colaborador = this.model.create(body);  // Instanciando a model para as trigger funcionar. Fonte: https://github.com/typeorm/typeorm/issues/5530
            await this.model.save(projeto_colaborador);
            return "Sucesso ao alterar a tarefa do id: " + id;
        }
        else {
            throw new HttpException('Não encontramos um projeto_colaborador com esse ID:', 500)
        }
    }

    async delete(id: number) {
        if (await this.find(id)) {
            return !!(await this.model.delete({ id: id })).affected // retorna linha afetadas, caso 0 será false, caso diferente de 0 é true
        }
        else {
            throw new HttpException(`Não foi possível excluir o ProjetoColaborador do ID: ${id}`, 500)
        }
    }
    async VerificaRegistroDuplicado(colaboradorId: number, projetoId: number) {
        if ((await this.model.find({ where: { colaborador: colaboradorId, projeto: projetoId } })).length > 0)
            throw new Error('Registro Duplicado')
    }
    async validarColaboradoresPresenteEmOutrosProjetos(colaboradorId: number, projeto: Projeto): Promise<void> {       
        
        const result = await createQueryBuilder('projeto_colaborador', 'pc') // Filtrando a tabela ManyToOne
            .innerJoinAndSelect('pc.projeto', 'p')
            .where('p.ativo = true')
            .andWhere('pc."colaboradorId" = :colaboradorId', {colaboradorId: colaboradorId})
            .andWhere("(date(:datainicio) between p.inicio and p.fim or date(:datafim) between p.inicio and p.fim)", { datainicio: projeto.inicio, datafim: projeto.fim  }) // Filtra se a data do projeto corrente é está entre a data de algum projeto em andamento
            .orWhere("(p.inicio between date(:datainicio) and  date(:datafim) or p.fim between date(:datainicio) and  date(:datafim))", { datainicio: projeto.inicio, datafim: projeto.fim  })
            .getMany()
        if (!!result.length) { // Se for encontrado mais de 1 registro não é para atualizar 
            const NomeProjeto = result[0]['projeto']['nome'] || 'treste';
            throw new Error(`Este colaborador já está presente no projeto: ${NomeProjeto} `)
        }
    }
}
