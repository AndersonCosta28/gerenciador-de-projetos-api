import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";
import { Colaborador } from "src/entities/colaborador.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Projeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsString()
    nome: string;

    @Column({ nullable: true })
    @IsString()
    descricao: string

    @Column({ nullable: false })
    @IsDateString()
    inicio: Date

    @Column({ nullable: true })
    @IsDateString()
    fim: Date

    @Column({ nullable: true, default: true })
    @IsBoolean()
    ativo: Boolean
    
    @CreateDateColumn()
    criado_em : Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @ManyToMany(type => Colaborador, {eager: true})
    @JoinTable()
    colaboradores: Colaborador[];
}