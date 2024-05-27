import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtable1716833884868 implements MigrationInterface {
    name = 'Addtable1716833884868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent_seller" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "dateDebut" SET DEFAULT '"2024-05-27T18:18:05.243Z"'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '"2024-05-27T18:18:05.243Z"'`);
        await queryRunner.query(`ALTER TABLE "Userclaims" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T18:18:05.245Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T18:18:05.246Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T18:18:05.246Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T18:18:05.246Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 17:31:22.749'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 17:31:22.749'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 17:31:22.749'`);
        await queryRunner.query(`ALTER TABLE "Userclaims" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 17:31:22.749'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '2024-05-27 17:31:22.747'`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "dateDebut" SET DEFAULT '2024-05-27 17:31:22.746'`);
        await queryRunner.query(`ALTER TABLE "agent_seller" DROP COLUMN "name"`);
    }

}
