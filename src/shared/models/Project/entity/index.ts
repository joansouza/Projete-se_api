import ProjectCategoryEntity from '@models/ProjectCategory/entity';
import FileEntity from '@models/File/entity';
import UserEntity from '@models/User/entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ProjectProposalEntity from '@models/ProjectProposal/entity';

@Entity('Project')
class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.projectProposals)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  projectCategoryId: string;

  @ManyToOne(
    () => ProjectCategoryEntity,
    (projectCategory) => projectCategory.projects
  )
  @JoinColumn({ name: 'projectCategoryId' })
  projectCategory: ProjectCategoryEntity;

  @OneToMany(
    () => ProjectProposalEntity,
    (projectProposal) => projectProposal.project
  )
  projectProposals: ProjectProposalEntity[];

  @Column({ nullable: true })
  imageCoverId?: string;

  @ManyToOne(() => FileEntity, (project) => project.projects)
  @JoinColumn({ name: 'imageCoverId' })
  imageCover?: FileEntity;

  @Column()
  name: string;

  @Column({ nullable: true })
  value?: string;

  @Column({ nullable: true })
  deadLine?: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default ProjectEntity;
