import { EntityRepository, Repository } from 'typeorm';
import Region from '.';

@EntityRepository(Region)
class RegionRespository extends Repository<Region> {}

export default RegionRespository;
