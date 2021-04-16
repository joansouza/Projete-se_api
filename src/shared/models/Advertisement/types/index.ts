import AdvertisementEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type AdvertisementPropertiesType = DeepPartial<AdvertisementEntity>;
