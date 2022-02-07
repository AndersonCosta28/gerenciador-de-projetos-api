import { Colaborador } from "src/colaborador/colaborador.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Projeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: true })
    descricao: string

    @Column({ nullable: false })
    inicio: Date

    @Column({ nullable: true })
    fim: Date

    @Column({ nullable: true, default: true })
    ativo: Boolean
    
    @CreateDateColumn()
    criado_em : Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @ManyToMany(type => Colaborador, {eager: true})
    @JoinTable()
    colaboradores: Colaborador[];
}