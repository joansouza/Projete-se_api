import { EntityRepository, Repository } from 'typeorm';
import CityEntity from '../entity';

@EntityRepository(CityEntity)
class CityRespository extends Repository<CityEntity> {}

export default CityRespository;
