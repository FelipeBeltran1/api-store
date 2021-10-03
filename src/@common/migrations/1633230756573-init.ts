import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1633230756573 implements MigrationInterface {
  name = 'init1633230756573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products"."categories" ("id" BIGSERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products"."products" ("id" BIGSERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" character varying(250) NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "brand_id" bigint, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products"."products" ("price") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products"."products" ("price", "stock") `,
    );
    await queryRunner.query(
      `CREATE TABLE "products"."brands" ("id" BIGSERIAL NOT NULL, "name" character varying(200) NOT NULL, "image" character varying(250) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."orders_products" ("id" BIGSERIAL NOT NULL, "quantity" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "product_id" bigint, "order_id" bigint, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."orders" ("id" BIGSERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" bigint, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."users" ("id" BIGSERIAL NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(250) NOT NULL, "role" character varying(250) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" bigint, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"."customers" ("id" BIGSERIAL NOT NULL, "name" character varying(200) NOT NULL, "lastName" character varying(250) NOT NULL, "phone" character varying(250) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products"."categories_products" ("category_id" bigint NOT NULL, "product_id" bigint NOT NULL, CONSTRAINT "PK_99a8246a1c03587ec10bd93836b" PRIMARY KEY ("category_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18751735d6d4936849dafa4d75" ON "products"."categories_products" ("category_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd4647bd19e92294b58a536798" ON "products"."categories_products" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "products"."products_categories" ("product_id" bigint NOT NULL, "category_id" bigint NOT NULL, CONSTRAINT "PK_634f5e1b5983772473fe0ec0008" PRIMARY KEY ("product_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2c76a4306a82c696d620f81f0" ON "products"."products_categories" ("product_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19fe0fe8c2fcf1cbe1a80f639f" ON "products"."products_categories" ("category_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "products"."brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders_products" ADD CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders_products" ADD CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "users"."orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "users"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "users"."customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."categories_products" ADD CONSTRAINT "FK_18751735d6d4936849dafa4d751" FOREIGN KEY ("category_id") REFERENCES "products"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."categories_products" ADD CONSTRAINT "FK_cd4647bd19e92294b58a536798c" FOREIGN KEY ("product_id") REFERENCES "products"."products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products_categories" ADD CONSTRAINT "FK_f2c76a4306a82c696d620f81f08" FOREIGN KEY ("product_id") REFERENCES "products"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products_categories" ADD CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1" FOREIGN KEY ("category_id") REFERENCES "products"."categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products"."products_categories" DROP CONSTRAINT "FK_19fe0fe8c2fcf1cbe1a80f639f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products_categories" DROP CONSTRAINT "FK_f2c76a4306a82c696d620f81f08"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."categories_products" DROP CONSTRAINT "FK_cd4647bd19e92294b58a536798c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."categories_products" DROP CONSTRAINT "FK_18751735d6d4936849dafa4d751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders_products" DROP CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users"."orders_products" DROP CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products"."products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"`,
    );
    await queryRunner.query(
      `DROP INDEX "products"."IDX_19fe0fe8c2fcf1cbe1a80f639f"`,
    );
    await queryRunner.query(
      `DROP INDEX "products"."IDX_f2c76a4306a82c696d620f81f0"`,
    );
    await queryRunner.query(`DROP TABLE "products"."products_categories"`);
    await queryRunner.query(
      `DROP INDEX "products"."IDX_cd4647bd19e92294b58a536798"`,
    );
    await queryRunner.query(
      `DROP INDEX "products"."IDX_18751735d6d4936849dafa4d75"`,
    );
    await queryRunner.query(`DROP TABLE "products"."categories_products"`);
    await queryRunner.query(`DROP TABLE "users"."customers"`);
    await queryRunner.query(`DROP TABLE "users"."users"`);
    await queryRunner.query(`DROP TABLE "users"."orders"`);
    await queryRunner.query(`DROP TABLE "users"."orders_products"`);
    await queryRunner.query(`DROP TABLE "products"."brands"`);
    await queryRunner.query(
      `DROP INDEX "products"."IDX_4fbc36ad745962e5c11001e1a8"`,
    );
    await queryRunner.query(
      `DROP INDEX "products"."IDX_75895eeb1903f8a17816dafe0a"`,
    );
    await queryRunner.query(`DROP TABLE "products"."products"`);
    await queryRunner.query(`DROP TABLE "products"."categories"`);
  }
}
