import RoleEntity from '@models/Role/entity';
import { getRoleRespository } from '@models/Role/repository';
import getPermissions from '../getPermissions';

async function getRoleWithPermissions(roleId: typeof RoleEntity.prototype.id) {
  const roleRespository = getRoleRespository();

  const role = await roleRespository.findOne({
    where: { id: roleId },
    relations: ['roleGroup', 'permissionOperations'],
  });

  if (role?.roleGroupId && role.permissionOperations) {
    role.permissions = await getPermissions(role);
  }

  return role;
}

export default getRoleWithPermissions;
