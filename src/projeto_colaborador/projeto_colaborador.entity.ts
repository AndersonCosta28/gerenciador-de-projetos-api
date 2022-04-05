import { Colaborador } from "src/colaborador/colaborador.entity";
import { Projeto } from "src/projeto/Projeto.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class projeto_colaborador {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Colaborador, (colaborador) => colaborador.projeto_colaborador, {eager: true})
    colaborador!: Colaborador;

    @ManyToOne(() => Projeto, (projeto) => projeto.projeto_colaborador, {eager: true})
    projeto!: Projeto;

    @Column()
    inicio: Date;

    @Column()
    fim: Date;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

}