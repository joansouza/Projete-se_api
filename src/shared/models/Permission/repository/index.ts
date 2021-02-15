import { EntityRepository, Repository } from 'typeorm';
import PermissionEntity from '../entity';

@EntityRepository(PermissionEntity)
class PermissionRespository extends Repository<PermissionEntity> {}

export default PermissionRespository;
