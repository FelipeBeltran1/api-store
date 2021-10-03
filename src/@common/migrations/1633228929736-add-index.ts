import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndex1633228929736 implements MigrationInterface {
    name = 'addIndex1633228929736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "products"."product" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "products"."product" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "products"."IDX_0decfc62b4e4834e2024a9d9c4"`);
        await queryRunner.query(`DROP INDEX "products"."IDX_b3234b06e4d16f52b384dfa4dd"`);
    }

}
