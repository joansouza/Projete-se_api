import { EntityRepository, Repository } from 'typeorm';
import OperationEntity from '../entity';

@EntityRepository(OperationEntity)
class OperationRespository extends Repository<OperationEntity> {}

export default OperationRespository;
