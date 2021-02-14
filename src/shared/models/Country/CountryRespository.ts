import { EntityRepository, Repository } from 'typeorm';
import Country from '.';

@EntityRepository(Country)
class CountryRespository extends Repository<Country> {}

export default CountryRespository;
