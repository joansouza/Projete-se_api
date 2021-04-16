import { MigrationInterface, QueryRunner } from 'typeorm';
import migrateProjectCategories from './migrateProjectCategories';
import migrateRoleBasedAccessControl from './migrateRoleBasedAccessControl';
import migrateUsers from './migrateUsers';

export class FirstDataPopulation1613521595352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.transaction(async (transaction) => {
      const roles = await migrateRoleBasedAccessControl(transaction);

      await migrateUsers(transaction, { roles });

      await migrateProjectCategories(transaction);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Do nothing
  }
}
