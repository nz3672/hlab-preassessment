import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743741742920 implements MigrationInterface {
    name = 'Migration1743741742920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "language-code" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying, CONSTRAINT "UQ_e5c1c37a4c390725b58e0546c08" UNIQUE ("code"), CONSTRAINT "PK_1ad08b4238dc8fc6a5b0bf4073d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product-translation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "langCodeId" integer, "productId" integer, CONSTRAINT "PK_1c56d88446a13704e59b0b46a21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product-translation" ADD CONSTRAINT "FK_2768a2c1f1420553e2556d56803" FOREIGN KEY ("langCodeId") REFERENCES "language-code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-translation" ADD CONSTRAINT "FK_6c292c967616bbd3d95a0e9a428" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product-translation" DROP CONSTRAINT "FK_6c292c967616bbd3d95a0e9a428"`);
        await queryRunner.query(`ALTER TABLE "product-translation" DROP CONSTRAINT "FK_2768a2c1f1420553e2556d56803"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product-translation"`);
        await queryRunner.query(`DROP TABLE "language-code"`);
    }

}
