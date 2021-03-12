import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoria1615150089637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Categoria',

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Categoria');
  }
}
