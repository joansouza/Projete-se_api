import CityEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type CityPropertiesType = DeepPartial<CityEntity>;
