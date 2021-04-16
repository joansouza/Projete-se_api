import { Request, Response } from 'express';
import { getProjectRespository } from '@models/Project/repository';
import { ProjectPropertiesType } from '@models/Project/types';

class ProjectController {
  async index(req: Request, res: Response) {
    const projectRespository = getProjectRespository();

    const projects = await projectRespository.find();

    return res.json(projects);
  }

  async show(req: Request, res: Response) {
    const id = req.query.id as string;
    const projectRespository = getProjectRespository();

    const project = await projectRespository.findOne(id);

    return res.json(project);
  }

  async store(req: Request, res: Response) {
    const data = req.body as ProjectPropertiesType;
    const projectRespository = getProjectRespository();

    const project = projectRespository.create({
      deadLine: data.deadLine,
      description: data.description,
      value: data.value,
      imageCoverId: data.imageCoverId,
      name: data.name,
      projectCategoryId: data.projectCategoryId,
      userId: req.user.id,
    });

    projectRespository.save(project);

    return res.json(project);
  }

  async update(req: Request, res: Response) {
    const id = req.query.id as string;
    const {
      deadLine,
      description,
      name,
      projectCategoryId,
      value,
    } = req.body as ProjectPropertiesType;
    const projectRespository = getProjectRespository();

    const project = await projectRespository.findOneOfMineOrFail(req.user, id);

    const result = await projectRespository.save({
      ...project,
      deadLine,
      description,
      name,
      projectCategoryId,
      value,
    });

    return res.json(result);
  }

  async destroy(req: Request, res: Response) {
    const id = req.query.id as string;
    const projectRespository = getProjectRespository();

    const project = await projectRespository.findOneOfMineOrFail(req.user, id);

    await projectRespository.save(project);

    return res.json({
      success: true,
      message: 'Projeto removido com sucesso.',
    });
  }
}

export default new ProjectController();
