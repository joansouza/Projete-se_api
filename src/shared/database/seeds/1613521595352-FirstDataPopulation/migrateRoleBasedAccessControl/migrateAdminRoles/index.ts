import { OperationPropertiesType } from '@models/Operation/types';
import PermissionOperationRespository from '@models/PermissionOperation/repository';
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
  const permissionOperationsWhereClause: {
    operationId: string;
    permissionId: string;
  }[] = [];

  permissions.forEach((p) => {
    const { operations, id: permissionId } = p || {};
    operations?.forEach((o) => {
      const operationId = o?.id;
      if (operationId && permissionId) {
        permissionOperationsWhereClause.push({ operationId, permissionId });
      }
    });
  });

  const permissionOperations =
    permissionOperationsWhereClause.length > 0
      ? await transaction
          .getCustomRepository(PermissionOperationRespository)
          .find({ where: permissionOperationsWhereClause })
      : [];

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
