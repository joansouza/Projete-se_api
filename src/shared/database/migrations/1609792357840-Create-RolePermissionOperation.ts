import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRolePermissionOperation1609792357840
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'RolePermissionOperation',
        columns: [
          {
            name: 'rolePermissionId',
            type: 'uuid',
          },
          {
            name: 'operationId',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('RolePermissionOperation', [
      new TableForeignKey({
        columnNames: ['rolePermissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'RolePermission',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['operationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Operation',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('RolePermissionOperation');
  }
}
