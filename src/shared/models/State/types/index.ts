import StateEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type StatePropertiesType = DeepPartial<StateEntity>;
