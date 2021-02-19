import RoleGroupRespository from '@models/RoleGroup/repository';
import { EntityManager } from 'typeorm';
import migrateAdminRoles from './migrateAdminRoles';
import migrateOperations from './migrateOperations';

async function migrateRoleBasedAccessControl(transaction: EntityManager) {
  const operations = await migrateOperations(transaction);

  const roleGroupRepository = transaction.getCustomRepository(
    RoleGroupRespository
  );

  const adminGroup = roleGroupRepository.create({
    name: 'Admin',
    routeName: 'admin',
  });

  await roleGroupRepository.save([adminGroup]);

  const roles = await migrateAdminRoles(transaction, adminGroup.id, operations);

  return roles;
}

export default migrateRoleBasedAccessControl;
