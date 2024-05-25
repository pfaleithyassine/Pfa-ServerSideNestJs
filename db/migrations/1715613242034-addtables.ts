import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtables1715613242034 implements MigrationInterface {
    name = 'Addtables1715613242034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agent_seller" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "profileImage" character varying, "isActivate" character varying NOT NULL DEFAULT 'ACTIVATED', "companyName" character varying NOT NULL, CONSTRAINT "PK_bd64751334e6e692bdd432a8e16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "imageProduct" character varying NOT NULL, "userId" integer, "agentSellerId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "profileImage" character varying, "isActivate" character varying NOT NULL DEFAULT 'ACTIVATED', "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-05-13T15:14:02.369Z"', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "insurance" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'assurance', "profileImage" character varying, "isActivate" character varying NOT NULL DEFAULT 'ACTIVATED', "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-05-13T15:14:02.369Z"', "companyName" character varying NOT NULL, CONSTRAINT "PK_07152a21fd75ea211dcea53e3c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repairMember" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'repair', "profileImage" character varying, "isActivate" character varying NOT NULL DEFAULT 'ACTIVATED', "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-05-13T15:14:02.369Z"', "companyName" character varying, CONSTRAINT "PK_eaae357da69b61a25af6c44e84c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_58ebe574ef928dca95312616e45" FOREIGN KEY ("agentSellerId") REFERENCES "agent_seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_58ebe574ef928dca95312616e45"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "repairMember"`);
        await queryRunner.query(`DROP TABLE "insurance"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "agent_seller"`);
    }

}
