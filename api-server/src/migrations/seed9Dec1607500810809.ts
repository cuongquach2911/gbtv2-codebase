import { MigrationInterface, QueryRunner } from "typeorm";

export class seed9Dec1607500810809 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO role (title, scopes, active) VALUES ('Default', '{}', true)`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "name" TO "title"`); // reverts things made in "up" method
    }
}
