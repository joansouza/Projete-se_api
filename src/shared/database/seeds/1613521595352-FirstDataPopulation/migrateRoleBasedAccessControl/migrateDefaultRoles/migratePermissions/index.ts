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
      name: 'Meu Avatar',
      routeName: 'meuAvatar',
      roleGroupId,
      operations,
    },
    {
      name: 'Meu Password',
      routeName: 'meuPassword',
      roleGroupId,
      operations,
    },
    {
      name: 'Meu Perfil',
      routeName: 'meuPerfil',
      roleGroupId,
      operations,
    },
    {
      name: 'Minha Sessão',
      routeName: 'minhaSessao',
      roleGroupId,
      operations,
    },
    {
      name: 'Meus Projetos',
      routeName: 'meuProjeto',
      roleGroupId,
      operations,
    },
    {
      name: 'Projetos',
      routeName: 'projeto',
      roleGroupId,
      operations,
    },
    {
      name: 'Meus Anúncios',
      routeName: 'meusAnuncios',
      roleGroupId,
      operations,
    },
    {
      name: 'Anúncios',
      routeName: 'anuncios',
      roleGroupId,
      operations,
    },
  ]);

  await permissionRepository.save(permissions);

  return permissions;
}

export default migratePermissions;
