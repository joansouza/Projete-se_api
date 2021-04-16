import ProjectCategoryRepository from '@models/ProjectCategory/repository';
import { ProjectCategoryPropertiesType } from '@models/ProjectCategory/types';
import { EntityManager } from 'typeorm';

async function migrateProjectCategories(transaction: EntityManager) {
  const projectCategoryRepository = transaction.getCustomRepository(
    ProjectCategoryRepository
  );

  const projectCategories: ProjectCategoryPropertiesType[] = [
    {
      name: 'Construção civil',
    },
    {
      name: 'Reparos domésticos',
    },
    {
      name: 'Automotivo',
    },
    {
      name: 'Desenvolvimento de software',
    },
    {
      name: 'Design e ilustrações',
    },
    {
      name: 'Aprendizado',
    },
  ];

  await projectCategoryRepository.save(projectCategories);

  return projectCategories;
}

export default migrateProjectCategories;
