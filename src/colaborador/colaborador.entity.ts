import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsDate, IsString, IsNumber } from 'class-validator';
@Entity()
export class Colaborador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsString()
    nome: string

    @Column({ nullable: false })
    @IsString()
    cargo: string

    @Column({ nullable: false })
    @IsDate()
    admissao: Date

    @Column({ nullable: true, default: true })
    @IsBoolean()
    ativo: boolean

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}