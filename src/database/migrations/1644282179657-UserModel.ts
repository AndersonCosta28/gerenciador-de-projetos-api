import {MigrationInterface, QueryRunner} from "typeorm";

export class UserModel1644282179657 implements MigrationInterface {
    name = 'UserModel1644282179657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario" varchar NOT NULL, "senha" varchar NOT NULL, "ativo" boolean NOT NULL, "criado_em" datetime NOT NULL DEFAULT (datetime('now')), "atualizado_em" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "usuario", "senha", "ativo") SELECT "id", "usuario", "senha", "ativo" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario" varchar NOT NULL, "senha" varchar NOT NULL, "ativo" boolean NOT NULL DEFAULT (1), "criado_em" datetime NOT NULL DEFAULT (datetime('now')), "atualizado_em" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "usuario", "senha", "ativo", "criado_em", "atualizado_em") SELECT "id", "usuario", "senha", "ativo", "criado_em", "atualizado_em" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario" varchar NOT NULL, "senha" varchar NOT NULL, "ativo" boolean NOT NULL, "criado_em" datetime NOT NULL DEFAULT (datetime('now')), "atualizado_em" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "usuario", "senha", "ativo", "criado_em", "atualizado_em") SELECT "id", "usuario", "senha", "ativo", "criado_em", "atualizado_em" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usuario" varchar NOT NULL, "senha" varchar NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "UQ_9921cd8ed63a072b8f93ead80f0" UNIQUE ("usuario"))`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "usuario", "senha", "ativo") SELECT "id", "usuario", "senha", "ativo" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
    }

}
