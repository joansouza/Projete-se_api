import OperationRespository from '@models/Operation/repository';
import { EntityManager } from 'typeorm';

async function migrateOperations(transaction: EntityManager) {
  const operationRepository = transaction.getCustomRepository(
    OperationRespository
  );

  const operations = operationRepository.create([
    {
      name: 'View all',
      method: 'GET',
      requireId: false,
    },
    {
      name: 'View one',
      method: 'GET',
      requireId: true,
    },
    {
      name: 'Create',
      method: 'POST',
      requireId: false,
    },
    {
      name: 'Update',
      method: 'PUT',
      requireId: false,
    },
    {
      name: 'Delete',
      method: 'DELETE',
      requireId: false,
    },
  ]);

  await operationRepository.save(operations);

  return operations;
}

export default migrateOperations;
