import { OperationPropertiesType } from '@models/Operation/types';
import PermissionRespository from '@models/Permission/repository';
import { EntityManager } from 'typeorm';

async function migratePermissions(
  transaction: EntityManager,
  roleGroupId: string,
  operations: OperationPropertiesType[]
) {
  const permissionRepository = transaction.getCustomRepository(
    PermissionRespository
  );

  const permissions = permissionRepository.create([
    {
      name: 'RoleGroup',
      routeName: 'roleGroup',
      roleGroupId,
      operations,
    },
    {
      name: 'Role',
      routeName: 'role',
      roleGroupId,
      operations,
    },
    {
      name: 'Operation',
      routeName: 'operation',
      roleGroupId,
      operations,
    },
    {
      name: 'Permission',
      routeName: 'permission',
      roleGroupId,
      operations,
    },
  ]);

  await permissionRepository.save(permissions);

  return permissions;
}

export default migratePermissions;
