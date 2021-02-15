import CountryEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type CountryPropertiesType = DeepPartial<CountryEntity>;
