import {MigrationInterface, QueryRunner} from "typeorm";

export class orders1633212565963 implements MigrationInterface {
    name = 'orders1633212565963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`CREATE TABLE "order_product" ("id" BIGSERIAL NOT NULL, "quantity" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "productId" bigint, "orderId" bigint, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users"."order" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "users"."order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD "customerId" bigint`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "products"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "users"."order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "users"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users"."order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
        await queryRunner.query(`ALTER TABLE "users"."order" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD "userId" bigint`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "order_product"`);
        await queryRunner.query(`ALTER TABLE "users"."order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
