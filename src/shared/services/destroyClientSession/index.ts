import { Response } from 'express';

function destroyClientSession(response: Response) {
  response.clearCookie('serverToken');
  response.clearCookie('clientToken');
}

export default destroyClientSession;
