import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1716671047326 implements MigrationInterface {
    name = 'Addtables1716671047326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "claims" ("id" SERIAL NOT NULL, CONSTRAINT "PK_96c91970c0dcb2f69fdccd0a698" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Userclaims" ("id" SERIAL NOT NULL, "userId" integer, "claimId" integer, CONSTRAINT "PK_947143f87b5ef27e1bb82b71256" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "dateDebut" SET DEFAULT '"2024-05-25T21:04:07.756Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-25T21:04:07.758Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-25T21:04:07.758Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-25T21:04:07.758Z"'`);
        await queryRunner.query(`ALTER TABLE "Userclaims" ADD CONSTRAINT "FK_7c001a53c57d7d6856a17da0d83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Userclaims" ADD CONSTRAINT "FK_6fa9deecc6f2ccaf826434bd626" FOREIGN KEY ("claimId") REFERENCES "claims"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Userclaims" DROP CONSTRAINT "FK_6fa9deecc6f2ccaf826434bd626"`);
        await queryRunner.query(`ALTER TABLE "Userclaims" DROP CONSTRAINT "FK_7c001a53c57d7d6856a17da0d83"`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-15 12:40:50.704'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-15 12:40:50.704'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-15 12:40:50.704'`);
        await queryRunner.query(`ALTER TABLE "contract" ALTER COLUMN "dateDebut" SET DEFAULT '2024-05-15 12:40:50.704'`);
        await queryRunner.query(`DROP TABLE "Userclaims"`);
        await queryRunner.query(`DROP TABLE "claims"`);
    }

}
