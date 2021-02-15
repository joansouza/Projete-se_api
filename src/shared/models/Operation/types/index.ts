import OperationEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type OperationPropertiesType = DeepPartial<OperationEntity>;
