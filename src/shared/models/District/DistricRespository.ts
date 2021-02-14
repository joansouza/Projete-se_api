import { EntityRepository, Repository } from 'typeorm';
import District from '.';

@EntityRepository(District)
class DistrictRespository extends Repository<District> {}

export default DistrictRespository;
