import { EntityRepository, Repository } from 'typeorm';
import State from '.';

@EntityRepository(State)
class StateRespository extends Repository<State> {}

export default StateRespository;
