import AppError from '@errors/AppError';
import UserEntity from '@models/User/entity';
import {
  EntityRepository,
  FindOneOptions,
  getCustomRepository,
  Repository,
} from 'typeorm';
import ProjectEntity from '../entity';

@EntityRepository(ProjectEntity)
class ProjectRespository extends Repository<ProjectEntity> {
  async findOneOfMine(
    thisUser: UserEntity,
    options: string & FindOneOptions<ProjectEntity>
  ) {
    const project = await this.findOne(options);

    if (project?.userId !== thisUser.id) {
      throw new AppError({
        message: 'Você não tem permissão para alterar este projeto.',
        statusCod: 401,
        userFriendly: true,
      });
    }

    return project;
  }

  async findOneOfMineOrFail(
    thisUser: UserEntity,
    options: string & FindOneOptions<ProjectEntity>
  ) {
    const project = await this.findOneOfMine(thisUser, options);

    if (!project) {
      throw new AppError({
        message: 'Não foi possível encontrar o projeto desejado.',
        statusCod: 404,
        userFriendly: true,
      });
    }

    return project;
  }
}

export default ProjectRespository;

export function getProjectRespository() {
  return getCustomRepository(ProjectRespository);
}
