import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { crypto } from "src/util/crypto.util";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    
    @Column({ unique: true, nullable: false })
    @ApiProperty() // Informação para API
    @IsString()
    @MinLength(2)
    usuario: string

    
    @Column({
        type: "varchar",
        nullable: false,
        transformer: crypto
    })
    @ApiProperty() // Informação para API
    @IsString()
    @MinLength(3)
    senha: string;

    
    @Column({ nullable: false, default: true })
    @ApiProperty() // Informação para API
    @IsOptional()
    @IsBoolean()
    ativo: boolean;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;

    @BeforeInsert()
    insertToUpperCase() {
        this.usuario = this.usuario.toUpperCase().trim()
    }

    @BeforeUpdate()
    updateToUpperCase() {
        this.usuario = this.usuario.toUpperCase().trim()
    }

}