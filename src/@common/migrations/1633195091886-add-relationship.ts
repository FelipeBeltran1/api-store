import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationship1633195091886 implements MigrationInterface {
    name = 'addRelationship1633195091886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products"."brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products"."brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products"."category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products"."category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."user" ADD "customerId" bigint`);
        await queryRunner.query(`ALTER TABLE "users"."user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users"."user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "users"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "users"."order" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users"."order" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "users"."user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`ALTER TABLE "users"."user" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "users"."user" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users"."user" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "users"."customer" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "users"."customer" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "products"."category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products"."category" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "products"."brand" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products"."brand" DROP COLUMN "createAt"`);
    }

}
