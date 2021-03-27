import AppError from '@errors/AppError';
import { getDistrictRespository } from '@models/District/repository';
import { Request, Response } from 'express';

class DistrictController {
  async index(req: Request, res: Response) {
    const { cityId } = req.query;

    if (typeof cityId !== 'string') {
      throw new AppError({
        message: 'Type of cityId must be string',
        statusCod: 400,
      });
    }

    const districtRepository = getDistrictRespository();
    const districts = await districtRepository.find({
      where: { cityId },
      select: ['id', 'name'],
    });

    return res.json(districts);
  }
}

export default new DistrictController();
