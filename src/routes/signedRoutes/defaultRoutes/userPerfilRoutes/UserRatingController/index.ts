import { Request, Response } from 'express';
import { getUserRatingRespository } from '@models/UserRating/repository';

class UserRatingController {
  async store(req: Request, res: Response) {
    const userRatingRespository = getUserRatingRespository();

    const userRating = userRatingRespository.rateUserAndSave({
      ...req.body,
      userEvaluatorId: req.user.id,
    });

    return res.json(userRating);
  }
}

export default new UserRatingController();
