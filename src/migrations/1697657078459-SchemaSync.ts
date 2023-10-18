import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1697657078459 implements MigrationInterface {
  name = 'SchemaSync1697657078459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scent" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "scent" ADD "recommendations" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scent" DROP COLUMN "recommendations"`,
    );
    await queryRunner.query(`ALTER TABLE "scent" DROP COLUMN "description"`);
  }
}
