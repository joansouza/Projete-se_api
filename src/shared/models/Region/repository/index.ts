import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import RegionEntity from '../entity';

@EntityRepository(RegionEntity)
class RegionRespository extends Repository<RegionEntity> {}

export default RegionRespository;

export function getRegionRespository() {
  return getCustomRepository(RegionRespository);
}
