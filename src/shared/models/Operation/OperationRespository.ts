import { EntityRepository, Repository } from 'typeorm';
import Operation from '.';

@EntityRepository(Operation)
class OperationRespository extends Repository<Operation> {}

export default OperationRespository;
