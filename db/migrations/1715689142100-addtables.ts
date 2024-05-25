import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1715689142100 implements MigrationInterface {
    name = 'Addtables1715689142100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent_seller" ALTER COLUMN "companyName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:19:02.431Z"'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:19:02.431Z"'`);
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '"2024-05-14T12:19:02.431Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "insurance" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:15:23.712'`);
        await queryRunner.query(`ALTER TABLE "repairMember" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:15:23.712'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT '2024-05-14 12:15:23.712'`);
        await queryRunner.query(`ALTER TABLE "agent_seller" ALTER COLUMN "companyName" SET NOT NULL`);
    }

}
