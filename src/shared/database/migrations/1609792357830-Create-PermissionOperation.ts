import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreatePermissionOperation1609792357820
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PermissionOperation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'permissionId',
            type: 'uuid',
          },
          {
            name: 'operationId',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('PermissionOperation', [
      new TableForeignKey({
        columnNames: ['operationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Operation',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['permissionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Permission',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.createUniqueConstraint(
      'PermissionOperation',
      new TableUnique({
        columnNames: ['permissionId', 'operationId'],
        name: 'PermissionOperation_unique_permissionId_operationId',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PermissionOperation');
  }
}
