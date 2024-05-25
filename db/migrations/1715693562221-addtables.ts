import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1715693562221 implements MigrationInterface {
    name = 'Addtables1715693562221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T13:32:42.544Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T13:32:42.544Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T13:32:42.544Z"'`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:19:02.431'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:19:02.431'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:19:02.431'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
