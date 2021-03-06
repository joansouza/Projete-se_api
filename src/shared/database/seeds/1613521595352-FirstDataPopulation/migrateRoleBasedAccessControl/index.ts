import RoleGroupRespository from '@models/RoleGroup/repository';
import { EntityManager } from 'typeorm';
import migrateAdminRoles from './migrateAdminRoles';
import migrateDefaultRoles from './migrateDefaultRoles';
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

  const defaultGroup = roleGroupRepository.create({
    name: 'Default',
    routeName: 'default',
  });

  await roleGroupRepository.save([adminGroup, defaultGroup]);

  const adminRoles = await migrateAdminRoles(
    transaction,
    adminGroup.id,
    operations
  );
  const defaultRoles = await migrateDefaultRoles(
    transaction,
    defaultGroup.id,
    operations
  );

  return [...adminRoles, ...defaultRoles];
}

export default migrateRoleBasedAccessControl;
