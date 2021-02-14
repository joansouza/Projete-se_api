import User from '../models/entities/User';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
