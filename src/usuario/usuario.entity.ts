import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    usuario: string

    @Column({nullable: false})
    senha: string;

    @Column({nullable: false})
    ativo: boolean;
}