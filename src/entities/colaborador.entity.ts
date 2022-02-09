import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
@Entity()
export class Colaborador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsString()
    @MinLength(2)
    nome: string

    @Column({ nullable: false })
    @IsString()
    @MinLength(4)
    cargo: string

    @Column({ nullable: false })
    @IsDateString()
    admissao: Date

    @Column({ nullable: true, default: true })
    @IsOptional()
    @IsBoolean()
    ativo: boolean

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @BeforeInsert()
    insertToUpperCase(){
        this.nome = this.nome.toUpperCase().trim();
        this.cargo = this.cargo.toUpperCase().trim();

    }


    @BeforeUpdate()
    updateToUpperCase(){
        this.nome = this.nome.toUpperCase().trim();
        this.cargo = this.cargo.toUpperCase().trim()
    }
}