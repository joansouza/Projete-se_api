import { getPermissionRespository } from '@models/Permission/repository';
import PermissionOperation from '@models/PermissionOperation/entity';
import RoleGroupEntity from '@models/RoleGroup/entity';

/** Deve ser informado um array de permissionOperations e/ou permissionOperationIds */
async function getPermissions(options: {
  permissionOperations?: PermissionOperation[];
  roleGroupId: typeof RoleGroupEntity.prototype.id;
  permissionOperationIds?: typeof PermissionOperation.prototype.id[];
}) {
  const { permissionOperations, roleGroupId, permissionOperationIds: pOIds } =
    options || {};
  const permissionOperationIds = pOIds || [];

  permissionOperations?.forEach(
    (e) => e?.id && permissionOperationIds.push(e.id)
  );

  const permissionRepository = getPermissionRespository();
  if (!(permissionOperationIds?.length > 0)) {
    return [];
  }

  const permissions = await permissionRepository
    .createQueryBuilder('permission')
    .innerJoin('permission.permissionOperations', 'permissionOperation')
    .innerJoinAndSelect(
      'permission.operations',
      'operation',
      'permissionOperation.id IN (:...permissionOperationIds) AND permissionOperation.operationId = operation.id',
      { permissionOperationIds }
    )
    .where({
      roleGroupId: roleGroupId,
    })
    .getMany();

  return permissions;
}

export default getPermissions;
