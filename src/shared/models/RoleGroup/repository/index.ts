import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import RoleGroupEntity from '../entity';

@EntityRepository(RoleGroupEntity)
class RoleGroupRespository extends Repository<RoleGroupEntity> {}

export default RoleGroupRespository;

export function getRoleGroupRespository() {
  return getCustomRepository(RoleGroupRespository);
}
