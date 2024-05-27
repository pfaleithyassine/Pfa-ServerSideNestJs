import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1716845086958 implements MigrationInterface {
    name = 'Addtables1716845086958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_8c98906c156f8d58239fa8ddb6f"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "claimsId"`);
        await queryRunner.query(`ALTER TABLE "claims" ADD "purchaseId" integer`);
        await queryRunner.query(`ALTER TABLE "claims" ALTER COLUMN "dateClaim" SET DEFAULT '"2024-05-27T21:24:47.294Z"'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '"2024-05-27T21:24:47.298Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T21:24:47.298Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T21:24:47.298Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-27T21:24:47.298Z"'`);
        await queryRunner.query(`ALTER TABLE "claims" ADD CONSTRAINT "FK_70e4f079ce032703dbfe7d4a099" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claims" DROP CONSTRAINT "FK_70e4f079ce032703dbfe7d4a099"`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 21:09:01.58'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 21:09:01.58'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-27 21:09:01.58'`);
        await queryRunner.query(`ALTER TABLE "purchase" ALTER COLUMN "dateDebut" SET DEFAULT '2024-05-27 21:09:01.58'`);
        await queryRunner.query(`ALTER TABLE "claims" ALTER COLUMN "dateClaim" SET DEFAULT '2024-05-27 21:09:01.576'`);
        await queryRunner.query(`ALTER TABLE "claims" DROP COLUMN "purchaseId"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "claimsId" integer`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_8c98906c156f8d58239fa8ddb6f" FOREIGN KEY ("claimsId") REFERENCES "claims"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
