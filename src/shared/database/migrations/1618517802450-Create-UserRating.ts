import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateUserRating1618517802450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'UserRating',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ratedUserId',
            type: 'uuid',
          },
          {
            name: 'userEvaluatorId',
            type: 'uuid',
          },
          {
            name: 'rating',
            type: 'double precision',
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

    await queryRunner.createForeignKeys('UserRating', [
      new TableForeignKey({
        columnNames: ['ratedUserId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['userEvaluatorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'User',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);

    await queryRunner.createUniqueConstraints('UserRating', [
      new TableUnique({
        columnNames: ['ratedUserId', 'userEvaluatorId'],
        name: 'UserRating_unique_ratedUserId_userEvaluatorId',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('UserRating');
  }
}
