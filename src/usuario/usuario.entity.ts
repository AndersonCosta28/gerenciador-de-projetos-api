import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';

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
        nullable: false
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
        const salt = bcrypt.genSaltSync(10);
        this.senha = bcrypt.hashSync(this.senha, salt);
        this.usuario = this.usuario.toUpperCase().trim()
    }

    @BeforeUpdate()
    updateToUpperCase() {
        const salt = bcrypt.genSaltSync(10);
        this.senha = bcrypt.hashSync(this.senha, salt);
        this.usuario = this.usuario.toUpperCase().trim()        
    }
}