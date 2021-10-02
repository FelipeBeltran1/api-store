import {MigrationInterface, QueryRunner} from "typeorm";

export class addFields1633187372938 implements MigrationInterface {
    name = 'addFields1633187372938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products"."product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products"."product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products"."product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products"."product" DROP COLUMN "createAt"`);
    }

}
