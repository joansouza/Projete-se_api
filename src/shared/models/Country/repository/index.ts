import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import CountryEntity from '../entity';

@EntityRepository(CountryEntity)
class CountryRespository extends Repository<CountryEntity> {}

export default CountryRespository;

export function getCountryRespository() {
  return getCustomRepository(CountryRespository);
}
