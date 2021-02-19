import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import Operation from '../entity';

@EntityRepository(Operation)
class OperationRespository extends Repository<Operation> {}

export default OperationRespository;

export function getOperationRespository() {
  return getCustomRepository(OperationRespository);
}
