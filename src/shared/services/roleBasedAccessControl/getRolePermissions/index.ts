import { getRoleRespository } from '@models/Role/repository';

async function getRolePermissions(roleId: string) {
  const roleRepository = getRoleRespository();

  const role = await roleRepository.findOne({
    where: { id: roleId },
    relations: ['roleGroup'],
  });

  return role;
}

export default getRolePermissions;
