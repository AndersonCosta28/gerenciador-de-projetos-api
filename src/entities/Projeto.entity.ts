import { IsBoolean, IsDateString, IsOptional, IsString, MinLength } from "class-validator";
import { Colaborador } from "src/entities/colaborador.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Projeto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    @IsString()
    @MinLength(8)
    nome: string;

    @Column({ nullable: true, default: "" })
    @IsOptional()
    @IsString()
    descricao: string

    @Column({ nullable: false })
    @IsDateString()
    inicio: Date

    @Column({ nullable: true })    
    @IsOptional()
    @IsDateString()
    fim: Date;

    @Column({ nullable: true, default: true })
    @IsOptional()
    @IsBoolean()
    ativo: Boolean
    
    @CreateDateColumn()
    criado_em : Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @ManyToMany(type => Colaborador, {eager: true})
    @JoinTable()
    colaboradores: Colaborador[];

    @BeforeInsert() // Não funciona
    insertToUpperCase(){
        this.nome = this.nome.toUpperCase().trim()
    }


    @BeforeUpdate() // Não funciona
    updateToUpperCase(){
        this.nome = this.nome.toUpperCase().trim()
    }
}