import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreatePermissions1609792357751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Permission',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'roleGroupId',
            type: 'uuid',
          },
          {
            name: 'permissionId',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            // comment: "Friendly name for the permission",
          },
          {
            name: 'routeName',
            type: 'varchar',
            // comment: "Describes the main Permission, must be written exactly the same as the Permission route.",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKeys('Permission', [
      new TableForeignKey({
        columnNames: ['roleGroupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'RoleGroup',
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

    await queryRunner.createUniqueConstraints('RoleGroupPermission', [
      new TableUnique({
        columnNames: ['roleGroupId', 'name'],
        name: 'uniqueNameRoleGroup',
      }),
      new TableUnique({
        columnNames: ['roleGroupId', 'routeName'],
        name: 'uniqueRouteNameRoleGroup',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Permission');
  }
}
