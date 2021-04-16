import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import AdvertisementEntity from '../entity';

@EntityRepository(AdvertisementEntity)
class AdvertisementRespository extends Repository<AdvertisementEntity> {}

export default AdvertisementRespository;

export function getAdvertisementCategoryRespository() {
  return getCustomRepository(AdvertisementRespository);
}
