import { Request, Response } from 'express';
import { getProjectProposalRespository } from '@models/ProjectProposal/repository';
import { ProjectProposalPropertiesType } from '@models/ProjectProposal/types';

class ProjectProposalController {
  async index(req: Request, res: Response) {
    const projectProposalRepository = getProjectProposalRespository();

    const projectProposals = await projectProposalRepository.find();

    return res.json(projectProposals);
  }

  async show(req: Request, res: Response) {
    const id = req.query.id as string;
    const projectProposalRepository = getProjectProposalRespository();

    const projectProposal = await projectProposalRepository.findOne(id);

    return res.json(projectProposal);
  }

  async store(req: Request, res: Response) {
    const data = req.body as ProjectProposalPropertiesType;
    const projectProposalRepository = getProjectProposalRespository();

    const projectProposal = projectProposalRepository.create({
      deadLine: data.deadLine,
      description: data.description,
      projectId: data.projectId,
      value: data.value,
      userId: req.user.id,
    });

    projectProposalRepository.save(projectProposal);

    return res.json(projectProposal);
  }

  async update(req: Request, res: Response) {
    const id = req.query.id as string;
    const {
      deadLine,
      description,
      value,
    } = req.body as ProjectProposalPropertiesType;
    const projectProposalRepository = getProjectProposalRespository();

    const projectProposal = await projectProposalRepository.findOneOfMineOrFail(
      req.user,
      id
    );

    const result = await projectProposalRepository.save({
      ...projectProposal,
      deadLine,
      description,
      value,
    });

    return res.json(result);
  }

  async destroy(req: Request, res: Response) {
    const id = req.query.id as string;
    const projectProposalRepository = getProjectProposalRespository();

    const projectProposal = await projectProposalRepository.findOneOfMineOrFail(
      req.user,
      id
    );

    await projectProposalRepository.save(projectProposal);

    return res.json({
      success: true,
      message: 'Proposta removida com sucesso.',
    });
  }
}

export default new ProjectProposalController();
