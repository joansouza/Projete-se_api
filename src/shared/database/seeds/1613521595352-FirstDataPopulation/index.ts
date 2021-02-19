/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import migrateRoleBasedAccessControl from './migrateRoleBasedAccessControl';
import migrateUsers from './migrateUsers';

export class FirstDataPopulation1613521595352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.transaction(async (transaction) => {
      const roles = await migrateRoleBasedAccessControl(transaction);

      await migrateUsers(transaction, { roles });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Do nothing
  }
}
