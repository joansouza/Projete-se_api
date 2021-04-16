/**
 * Crie usando o comando `yarn typeorm migration:create -n  Create-NomeTable`
 * Altere o `NomeTabela` para o nome de sua nova tabela usando CamelCase.
 * O código abaixo é o exemplo de propriedades que devem existir.
 */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableName1618517802410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'TableName',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
    await queryRunner.dropTable('TableName');
  }
}
