import { MigrationInterface, QueryRunner } from "typeorm";

export class scheduleEntity1678782780377 implements MigrationInterface {
    name = 'scheduleEntity1678782780377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "realEstateId" integer, "userId" integer, CONSTRAINT "PK_751450246dee9abc82a47dabc4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_9ea44d2d89def175ed9db8ccf3f" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_6b07764ec82685efb66e5629845" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_e64472d578faf91bee90a06ecc0"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_6b07764ec82685efb66e5629845"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_9ea44d2d89def175ed9db8ccf3f"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
    }

}
