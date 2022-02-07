import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Colaborador{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string

    @Column({nullable: false})
    cargo: string

    @Column({nullable: false})
    admissao: Date

    @Column({nullable: true, default: true})
    ativo: boolean

    @CreateDateColumn()
    criado_em : Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}