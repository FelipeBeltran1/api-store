import {MigrationInterface, QueryRunner} from "typeorm";

export class createBrandProductRelation1633204729709 implements MigrationInterface {
    name = 'createBrandProductRelation1633204729709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products"."product" ADD "brandId" bigint`);
        await queryRunner.query(`ALTER TABLE "products"."brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "products"."product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "products"."brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products"."product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "products"."brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`);
        await queryRunner.query(`ALTER TABLE "products"."product" DROP COLUMN "brandId"`);
    }

}
