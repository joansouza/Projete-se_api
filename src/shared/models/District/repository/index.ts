import { EntityRepository, Repository } from 'typeorm';
import DistrictEntity from '../entity';

@EntityRepository(DistrictEntity)
class DistrictRespository extends Repository<DistrictEntity> {}

export default DistrictRespository;
