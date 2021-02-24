import UserEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type UserPropertiesType = DeepPartial<UserEntity>;

export type UserSessionFieldType = {
  serverToken: string;
  clientToken: string;
};
