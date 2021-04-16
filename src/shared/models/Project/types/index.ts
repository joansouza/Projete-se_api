import ProjectEntity from '../entity';
import { DeepPartial } from 'typeorm';

export type ProjectPropertiesType = DeepPartial<ProjectEntity>;
