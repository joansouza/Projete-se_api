import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import RoleEntity from '../entity';

@EntityRepository(RoleEntity)
class RoleRespository extends Repository<RoleEntity> {}

export default RoleRespository;

export function getRoleRespository() {
  return getCustomRepository(RoleRespository);
}
