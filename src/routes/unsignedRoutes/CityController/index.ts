import AppError from '@errors/AppError';
import { getCityRespository } from '@models/City/repository';
import { Request, Response } from 'express';

class CityController {
  async index(req: Request, res: Response) {
    const { stateId } = req.query;

    if (typeof stateId !== 'string') {
      throw new AppError({
        message: 'Type of stateId must be string',
        statusCod: 400,
      });
    }

    const cityRepository = getCityRespository();
    const cities = await cityRepository.find({
      where: { stateId },
      select: ['id', 'name'],
    });

    return res.json(cities);
  }
}

export default new CityController();
