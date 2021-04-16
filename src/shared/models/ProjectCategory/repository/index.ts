import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import ProjectCategoryEntity from '../entity';

@EntityRepository(ProjectCategoryEntity)
class ProjectCategoryRespository extends Repository<ProjectCategoryEntity> {}

export default ProjectCategoryRespository;

export function getProjectCategoryRespository() {
  return getCustomRepository(ProjectCategoryRespository);
}
