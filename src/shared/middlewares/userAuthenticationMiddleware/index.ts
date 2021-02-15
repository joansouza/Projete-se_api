import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getUserRepository } from '@models/User/repository';
import authConfig from '@config/authConfig';
import AppError from '@errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function userAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { updateSession } = req.query;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  const token = authorization?.split(' ')?.[1];

  try {
    const decoded = verify(token, authConfig.secretKey);

    const { sub } = decoded as TokenPayload;

    const userRepository = getUserRepository();

    const user = await userRepository.findOne(sub, { relations: ['avatar'] });

    const validToken = user?.sessionData?.token === token;

    if (user?.id && validToken) {
      if (updateSession === 'true') {
        user.updateSession();
        await userRepository.save(user);
      }

      req.user = user;

      return next();
    } else {
      throw new Error();
    }
  } catch {
    throw new AppError({ message: 'Invalid JWT token' });
  }
}

export default userAuthenticationMiddleware;
