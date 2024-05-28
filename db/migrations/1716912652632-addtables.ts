import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1716912652632 implements MigrationInterface {
    name = 'Addtables1716912652632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repairMember" DROP COLUMN "profileImage"`);
        await queryRunner.query(`ALTER TABLE "repairMember" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "claims" ADD "repairMemberId" integer`);
        await queryRunner.query(`ALTER TABLE "claims" ALTER COLUMN "dateClaim" SET DEFAULT '"2024-05-28T16:10:53.010Z"'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '"2024-05-28T16:10:53.014Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-28T16:10:53.014Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-28T16:10:53.014Z"'`);
        await queryRunner.query(`ALTER TABLE "claims" ADD CONSTRAINT "FK_d20cf3f4a6cd3cd69d7e0f710f5" FOREIGN KEY ("repairMemberId") REFERENCES "repairMember"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claims" DROP CONSTRAINT "FK_d20cf3f4a6cd3cd69d7e0f710f5"`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 21:24:47.298'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 21:24:47.298'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '2024-05-27 21:24:47.298'`);
        await queryRunner.query(`ALTER TABLE "claims" ALTER COLUMN "dateClaim" SET DEFAULT '2024-05-27 21:24:47.294'`);
        await queryRunner.query(`ALTER TABLE "claims" DROP COLUMN "repairMemberId"`);
        await queryRunner.query(`ALTER TABLE "repairMember" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '2024-05-27 21:24:47.298'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ADD "profileImage" character varying`);
    }

}
