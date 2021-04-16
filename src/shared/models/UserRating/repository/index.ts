import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import UserRatingEntity from '../entity';

@EntityRepository(UserRatingEntity)
class UserRatingRespository extends Repository<UserRatingEntity> {
  async rateUser(data: UserRatingEntity) {
    const { ratedUserId, userEvaluatorId, rating } = data;

    const userRating = await this.findOne({
      where: { ratedUserId, userEvaluatorId },
    });

    if (userRating?.id) {
      userRating.rating = rating;

      return userRating;
    } else {
      return this.create({ ratedUserId, userEvaluatorId, rating });
    }
  }

  async rateUserAndSave(data: UserRatingEntity) {
    const userRating = await this.rateUser(data);

    return this.save(userRating);
  }
}

export default UserRatingRespository;

export function getUserRatingRespository() {
  return getCustomRepository(UserRatingRespository);
}
