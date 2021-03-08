/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';



export class CreateProposta1615157098467 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(

      new Table({

        name: 'Proposta',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'valueProposal',
            type: 'varchar',
          },

          {
            name: 'deadLine',
            type: 'varchar',
          },

          {
            name: 'email',
            type: 'varchar',
          },

          {
            name: 'phone',
            type: 'varchar',
          },

          {
            name: 'phoneTwo',
            type: 'varchar',
          },

          {
            name: 'optionalInfo',
            type: 'varchar',
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
    await queryRunner.dropTable('Proposta');
  }

}

