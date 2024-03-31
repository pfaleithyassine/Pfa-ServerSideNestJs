import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationAddingPhoto1711386281044 implements MigrationInterface {
    name = 'MigrationAddingPhoto1711386281044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileImage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileImage"`);
    }

}
