import ProjectEntity from '@models/Project/entity';
import UserEntity from '@models/User/entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ProjectProposal')
class ProjectProposalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.projectProposals)
  @JoinColumn({ name: 'projectId' })
  user?: UserEntity;

  @Column()
  projectId: string;

  @ManyToOne(() => ProjectEntity, (project) => project.projectProposals)
  @JoinColumn({ name: 'projectId' })
  project?: ProjectEntity;

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

export default ProjectProposalEntity;
