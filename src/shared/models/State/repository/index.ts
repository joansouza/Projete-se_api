import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import StateEntity from '../entity';

@EntityRepository(StateEntity)
class StateRespository extends Repository<StateEntity> {}

export default StateRespository;

export function getStateRespository() {
  return getCustomRepository(StateRespository);
}
