import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1715688923085 implements MigrationInterface {
    name = 'Addtables1715688923085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "contract" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:15:23.712Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:15:23.712Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:15:23.712Z"'`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_a837a077c734b8f4106c6923685" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_dd858afbcd3220b896824a5e4c3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_dd858afbcd3220b896824a5e4c3"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_a837a077c734b8f4106c6923685"`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-13 15:14:02.369'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-13 15:14:02.369'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-13 15:14:02.369'`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "userId"`);
    }

}
