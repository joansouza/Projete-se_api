import OperationRespository from '@models/Operation/repository';
import { EntityManager } from 'typeorm';

async function migrateOperations(transaction: EntityManager) {
  const operationRepository = transaction.getCustomRepository(
    OperationRespository
  );

  const operations = operationRepository.create([
    {
      name: 'View all',
      method: 'get',
    },
    {
      name: 'View one',
      method: 'get',
    },
    {
      name: 'Create',
      method: 'post',
    },
    {
      name: 'Update',
      method: 'put',
    },
    {
      name: 'Delete',
      method: 'delete',
    },
  ]);

  await operationRepository.save(operations);

  return operations;
}

export default migrateOperations;
