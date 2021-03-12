import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getUserRepository } from '@models/User/repository';
import authConfig from '@config/authConfig';
import AppError from '@errors/AppError';
import { validate as validateUUID } from 'uuid';
import destroyClientSession from '@services/destroyClientSession';

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
  try {
    const { method, originalUrl } = req;
    const paths = originalUrl.split('/');
    // const roleGroupRouteName = paths?.[2];
    const permissionRouteName = paths?.[2];
    const operationId = paths?.[3];

    if (
      paths?.[1] !== 'signed' ||
      !permissionRouteName ||
      paths?.[4] ||
      (operationId && !validateUUID(operationId))
    ) {
      throw new AppError({
        message: 'O path informado possui dados inválidos.',
        statusCod: 400,
      });
    }

    const clientToken = req.cookies?.clientToken;
    const serverToken = req.cookies?.serverToken;

    if (!clientToken || !serverToken) {
      throw new Error();
    }

    const decodedClientToken = verify(clientToken, authConfig.secretKey);
    const decodedServerToken = verify(serverToken, authConfig.secretKey);

    const { sub: clientTokenId } = decodedClientToken as TokenPayload;
    const { sub: serverTokenId } = decodedServerToken as TokenPayload;

    if (clientTokenId !== serverTokenId) {
      throw new Error();
    }

    const userRepository = getUserRepository();

    const user = await userRepository
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .innerJoin('role.permissionOperations', 'permissionOperations')
      .innerJoin(
        'permissionOperations.permission',
        'permission',
        'permission.routeName = :permissionRouteName AND permission.roleGroupId = role.roleGroupId',
        { permissionRouteName }
      )
      .innerJoin(
        'permissionOperations.operation',
        'operation',
        'operation.method = :method AND operation.requireId = :requireId',
        {
          method,
          requireId: operationId ? true : false,
        }
      )
      .where({
        id: serverTokenId,
      })
      .getOne();

    const { clientToken: cT, serverToken: sT } = user?.sessionData || {};

    const validToken = clientToken === cT && serverToken === sT;

    if (!user?.id || !validToken) {
      throw new Error();
    }

    req.user = user;

    return next();
  } catch {
    destroyClientSession(res);
    throw new AppError({ message: 'Invalid JWT token', statusCod: 400 });
  }
}

export default userAuthenticationMiddleware;
