import AppError from '@errors/AppError';
import UserEntity from '@models/User/entity';
import {
  EntityRepository,
  FindOneOptions,
  getCustomRepository,
  Repository,
} from 'typeorm';
import ProjectProposalEntity from '../entity';

@EntityRepository(ProjectProposalEntity)
class ProjectProposalRespository extends Repository<ProjectProposalEntity> {
  async findOneOfMine(
    thisUser: UserEntity,
    options: string & FindOneOptions<ProjectProposalEntity>
  ) {
    const projectProposal = await this.findOne(options);

    if (projectProposal?.userId !== thisUser.id) {
      throw new AppError({
        message: 'Você não tem permissão para alterar esta proposta.',
        statusCod: 401,
        userFriendly: true,
      });
    }

    return projectProposal;
  }

  async findOneOfMineOrFail(
    thisUser: UserEntity,
    options: string & FindOneOptions<ProjectProposalEntity>
  ) {
    const projectProposal = await this.findOneOfMine(thisUser, options);

    if (!projectProposal) {
      throw new AppError({
        message: 'Não foi possível encontrar a proposta desejada.',
        statusCod: 404,
        userFriendly: true,
      });
    }

    return projectProposal;
  }
}

export default ProjectProposalRespository;

export function getProjectProposalRespository() {
  return getCustomRepository(ProjectProposalRespository);
}
