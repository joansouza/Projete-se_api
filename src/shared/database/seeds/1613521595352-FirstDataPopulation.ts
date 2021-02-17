/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import generateFirstDataPopulation from './generateFirstDataPopulation';

export class FirstDataPopulation1613521595352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await generateFirstDataPopulation(queryRunner.connection);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Do nothing
  }
}
