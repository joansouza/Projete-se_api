import { EntityRepository, Repository } from 'typeorm';
import CountryEntity from '../entity';

@EntityRepository(CountryEntity)
class CountryRespository extends Repository<CountryEntity> {}

export default CountryRespository;
