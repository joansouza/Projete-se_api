import { EntityRepository, Repository } from 'typeorm';
import RegionEntity from '../entity';

@EntityRepository(RegionEntity)
class RegionRespository extends Repository<RegionEntity> {}

export default RegionRespository;
