import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getUserRepository } from '@models/User/repository';
import authConfig from '@config/authConfig';
import AppError from '@errors/AppError';
import { validate as validateUUID } from 'uuid';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function userAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, originalUrl } = req;
  const paths = originalUrl.split('/');
  const roleGroupRouteName = paths?.[2];
  const permissionRouteName = paths?.[3];
  const operationId = paths?.[4];

  if (
    paths?.[1] !== 'signed' ||
    !permissionRouteName ||
    paths?.[5] ||
    (operationId && !validateUUID(operationId))
  ) {
    throw new AppError({
      message: 'O path informado possui dados inválidos.',
      statusCod: 400,
    });
  }

  // const { updateSession } = req.query;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: 'JWT token is missing' });
  }

  const token = authorization?.split(' ')?.[1];

  try {
    const decoded = verify(token, authConfig.secretKey);

    const { sub } = decoded as TokenPayload;

    const userRepository = getUserRepository();

    const user = await userRepository
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .innerJoin(
        'role.roleGroup',
        'roleGroup',
        'roleGroup.routeName = :roleGroupRouteName',
        { roleGroupRouteName }
      )
      .innerJoin(
        'roleGroup.permissions',
        'permission',
        'permission.routeName = :permissionRouteName',
        { permissionRouteName }
      )
      .innerJoin(
        'permission.operations',
        'operation',
        'operation.method = :method AND operation.requireId = :requireId',
        {
          method,
          requireId: operationId ? true : false,
        }
      )
      .where({
        id: sub,
      })
      .getOne();

    const validToken = user?.sessionData?.token === token;

    if (!user?.id || !validToken) {
      throw new Error();
    }

    // if (updateSession === 'true') {
    //   user.updateSession();
    //   await userRepository.save(user);
    // }

    req.user = user;

    return next();
  } catch {
    throw new AppError({ message: 'Invalid JWT token', statusCod: 400 });
  }
}

export default userAuthenticationMiddleware;
