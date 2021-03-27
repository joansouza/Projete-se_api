import { getStateRespository } from '@models/State/repository';
import { Request, Response } from 'express';

class StateController {
  async index(req: Request, res: Response) {
    const stateRepository = getStateRespository();
    const states = await stateRepository.find({ select: ['id', 'name', 'uf'] });

    return res.json(states);
  }
}

export default new StateController();
