import {MigrationInterface, QueryRunner} from "typeorm";

export class CriacaoDeModel1644276235668 implements MigrationInterface {
    name = 'CriacaoDeModel1644276235668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "colaborador" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cargo" varchar NOT NULL, "admissao" datetime NOT NULL, "ativo" boolean DEFAULT (1), "criado_em" datetime NOT NULL DEFAULT (datetime('now')), "atualizado_em" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "projeto" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "descricao" varchar, "inicio" datetime NOT NULL, "fim" datetime, "ativo" boolean DEFAULT (1), "criado_em" datetime NOT NULL DEFAULT (datetime('now')), "atualizado_em" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario" varchar NOT NULL, "senha" varchar NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
        await queryRunner.query(`CREATE TABLE "projeto_colaboradores_colaborador" ("projetoId" integer NOT NULL, "colaboradorId" integer NOT NULL, PRIMARY KEY ("projetoId", "colaboradorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_377fd4c7fecfd88d3c665e4dce" ON "projeto_colaboradores_colaborador" ("projetoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dad26cba8a8e70f999fb0a2b9b" ON "projeto_colaboradores_colaborador" ("colaboradorId") `);
        await queryRunner.query(`DROP INDEX "IDX_377fd4c7fecfd88d3c665e4dce"`);
        await queryRunner.query(`DROP INDEX "IDX_dad26cba8a8e70f999fb0a2b9b"`);
        await queryRunner.query(`CREATE TABLE "temporary_projeto_colaboradores_colaborador" ("projetoId" integer NOT NULL, "colaboradorId" integer NOT NULL, CONSTRAINT "FK_377fd4c7fecfd88d3c665e4dce8" FOREIGN KEY ("projetoId") REFERENCES "projeto" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_dad26cba8a8e70f999fb0a2b9b7" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("projetoId", "colaboradorId"))`);
        await queryRunner.query(`INSERT INTO "temporary_projeto_colaboradores_colaborador"("projetoId", "colaboradorId") SELECT "projetoId", "colaboradorId" FROM "projeto_colaboradores_colaborador"`);
        await queryRunner.query(`DROP TABLE "projeto_colaboradores_colaborador"`);
        await queryRunner.query(`ALTER TABLE "temporary_projeto_colaboradores_colaborador" RENAME TO "projeto_colaboradores_colaborador"`);
        await queryRunner.query(`CREATE INDEX "IDX_377fd4c7fecfd88d3c665e4dce" ON "projeto_colaboradores_colaborador" ("projetoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dad26cba8a8e70f999fb0a2b9b" ON "projeto_colaboradores_colaborador" ("colaboradorId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_dad26cba8a8e70f999fb0a2b9b"`);
        await queryRunner.query(`DROP INDEX "IDX_377fd4c7fecfd88d3c665e4dce"`);
        await queryRunner.query(`ALTER TABLE "projeto_colaboradores_colaborador" RENAME TO "temporary_projeto_colaboradores_colaborador"`);
        await queryRunner.query(`CREATE TABLE "projeto_colaboradores_colaborador" ("projetoId" integer NOT NULL, "colaboradorId" integer NOT NULL, PRIMARY KEY ("projetoId", "colaboradorId"))`);
        await queryRunner.query(`INSERT INTO "projeto_colaboradores_colaborador"("projetoId", "colaboradorId") SELECT "projetoId", "colaboradorId" FROM "temporary_projeto_colaboradores_colaborador"`);
        await queryRunner.query(`DROP TABLE "temporary_projeto_colaboradores_colaborador"`);
        await queryRunner.query(`CREATE INDEX "IDX_dad26cba8a8e70f999fb0a2b9b" ON "projeto_colaboradores_colaborador" ("colaboradorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_377fd4c7fecfd88d3c665e4dce" ON "projeto_colaboradores_colaborador" ("projetoId") `);
        await queryRunner.query(`DROP INDEX "IDX_dad26cba8a8e70f999fb0a2b9b"`);
        await queryRunner.query(`DROP INDEX "IDX_377fd4c7fecfd88d3c665e4dce"`);
        await queryRunner.query(`DROP TABLE "projeto_colaboradores_colaborador"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "projeto"`);
        await queryRunner.query(`DROP TABLE "colaborador"`);
    }

}
