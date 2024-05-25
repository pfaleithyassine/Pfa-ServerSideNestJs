import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1715776850344 implements MigrationInterface {
    name = 'Addtables1715776850344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "dateDebut" TIMESTAMP NOT NULL DEFAULT '"2024-05-15T12:40:50.704Z"'`);
        await queryRunner.query(`ALTER TABLE "contract" ADD "dateFin" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-15T12:40:50.704Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-15T12:40:50.704Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-15T12:40:50.704Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 13:32:42.544'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 13:32:42.544'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 13:32:42.544'`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "dateFin"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "dateDebut"`);
    }

}
