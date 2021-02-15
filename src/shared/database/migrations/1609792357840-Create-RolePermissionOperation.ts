import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateRolePermissionOperation1609792357840
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RolePermissionOperation',
        columns: [
          {
            name: 'roleId',
            type: 'uuid',
          },
          {
            name: 'permissionOperationId',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('RolePermissionOperation', [
      new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['permissionOperationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'PermissionOperation',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      'RolePermissionOperation',
      new TableUnique({
        columnNames: ['roleId', 'permissionOperationId'],
        name: 'PermissionOperation_unique_roleId_permissionOperationId',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('RolePermissionOperation');
  }
}
