import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    @IsString()
    usuario: string

    @Column({nullable: false})
    @IsString()
    senha: string;

    @Column({nullable: false, default: true})
    @IsBoolean()
    ativo: boolean;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}