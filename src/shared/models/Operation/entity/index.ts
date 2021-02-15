import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PermissionOperationEntity from '@models/PermissionOperation/entity';
import PermissionEntity from '@models/Permission/entity';

@Entity('Operation')
class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  method?: string;

  @Column({ nullable: true })
  secret?: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];

  @OneToMany(
    () => PermissionOperationEntity,
    (permissionOperation) => permissionOperation.operationId
  )
  @JoinTable()
  permissionOperations: PermissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Operation;
