import { OperationPropertiesType } from '@models/Operation/types';
import { PermissionOperationPropertiesType } from '@models/PermissionOperation/types';
import RoleRespository from '@models/Role/repository';
import { EntityManager } from 'typeorm';
import migratePermissions from './migratePermissions';

async function migrateAdminRoles(
  transaction: EntityManager,
  roleGroupId: string,
  operations: OperationPropertiesType[]
) {
  const permissions = await migratePermissions(
    transaction,
    roleGroupId,
    operations
  );
  let permissionOperations: PermissionOperationPropertiesType[] = [];
  permissions.forEach((p) => {
    if (Array.isArray(p.permissionOperations)) {
      permissionOperations = [...p.permissionOperations];
    }
  });

  const roleRepository = transaction.getCustomRepository(RoleRespository);

  const roles = roleRepository.create([
    {
      name: 'Root',
      roleGroupId,
      permissionOperations,
    },
  ]);

  await roleRepository.save(roles);

  return roles;
}

export default migrateAdminRoles;
