import UserEntity from '@models/User/entity';

declare global {
  namespace Express {
    export interface Request {
      user: UserEntity;
    }
  }
}
