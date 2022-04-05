import {MigrationInterface, QueryRunner} from "typeorm";

export class banco1649124492767 implements MigrationInterface {
    name = 'banco1649124492767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET timezone = 'America/Bahia'`);
        await queryRunner.query(`CREATE TABLE "colaborador" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cargo" character varying NOT NULL, "admissao" TIMESTAMP NOT NULL, "ativo" boolean DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9b24705cf70371e22e6eb135daa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projeto" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying DEFAULT '', "inicio" date NOT NULL, "fim" date, "ativo" boolean DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4fb322f23eca1c8331e75a9f263" UNIQUE ("nome"), CONSTRAINT "PK_87de7c3af72f824a860298c3c3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projeto_colaborador" ("id" SERIAL NOT NULL, "inicio" TIMESTAMP NOT NULL, "fim" TIMESTAMP NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), "colaboradorId" integer, "projetoId" integer, CONSTRAINT "PK_0e781505226b77afdfa11e4c8df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "usuario" character varying NOT NULL, "senha" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projeto_colaborador" ADD CONSTRAINT "FK_9c08a48cdae692b0f114bb47c77" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projeto_colaborador" ADD CONSTRAINT "FK_6a44beb9f2e90da65f471bc39c4" FOREIGN KEY ("projetoId") REFERENCES "projeto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`insert into usuario (usuario, senha) values ('ADMIN', '$2b$10$YxxOfzUsjhEYS0iq8As67OycmGlbnty5aM6AEW5.i.5oXWjjcE3Mu')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projeto_colaborador" DROP CONSTRAINT "FK_6a44beb9f2e90da65f471bc39c4"`);
        await queryRunner.query(`ALTER TABLE "projeto_colaborador" DROP CONSTRAINT "FK_9c08a48cdae692b0f114bb47c77"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "projeto_colaborador"`);
        await queryRunner.query(`DROP TABLE "projeto"`);
        await queryRunner.query(`DROP TABLE "colaborador"`);
    }

}
