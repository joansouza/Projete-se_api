import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import PermissionOperationEntity from '../entity';

@EntityRepository(PermissionOperationEntity)
class PermissionOperationRespository extends Repository<PermissionOperationEntity> {}

export default PermissionOperationRespository;

export function getPermissionOperationRespository() {
  return getCustomRepository(PermissionOperationRespository);
}
