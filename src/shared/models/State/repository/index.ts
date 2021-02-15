import { EntityRepository, Repository } from 'typeorm';
import StateEntity from '../entity';

@EntityRepository(StateEntity)
class StateRespository extends Repository<StateEntity> {}

export default StateRespository;
