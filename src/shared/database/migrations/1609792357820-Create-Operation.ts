import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateOperation1609792357820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Operation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'method',
            type: 'varchar',
          },
          {
            name: 'requireId',
            type: 'boolean',
          },
          {
            name: 'secret',
            type: 'varchar',
            isNullable: true,
            // comment: "It is optional, if used, all requests to this route need, {headers: {routeAuthorization: 'thisSecret'}}.",
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

    await queryRunner.createUniqueConstraints('Operation', [
      new TableUnique({
        columnNames: ['method', 'requireId'],
        name: 'Operation_unique_method_requireId',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Operation');
  }
}
