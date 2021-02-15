import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateUserRole1608238179600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'UserRole',
        columns: [
          {
            name: 'roleId',
            type: 'uuid',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('UserRole', [
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      'UserRole',
      new TableUnique({
        columnNames: ['roleId', 'userId'],
        name: 'UserRole_unique_roleId_userId',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('UserRole');
  }
}
