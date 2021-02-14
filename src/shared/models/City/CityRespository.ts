import { EntityRepository, Repository } from 'typeorm';
import City from '.';

@EntityRepository(City)
class CityRespository extends Repository<City> {}

export default CityRespository;
