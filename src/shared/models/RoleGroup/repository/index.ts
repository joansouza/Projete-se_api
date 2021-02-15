import { EntityRepository, Repository } from 'typeorm';
import RoleGroupEntity from '../entity';

@EntityRepository(RoleGroupEntity)
class RoleGroupRespository extends Repository<RoleGroupEntity> {}

export default RoleGroupRespository;
