import PermissionOperation from '@models/PermissionOperation';
import User from '@models/User';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import RoleGroup from '../RoleGroup';

@Entity('Role')
@Unique('uniqueNameRoleGroup', ['roleGroupId', 'name'])
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  roleGroupId: string;

  @ManyToOne(() => RoleGroup)
  @JoinColumn({ name: 'roleGroupId' })
  roleGroup?: RoleGroup;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => PermissionOperation)
  @JoinTable()
  permissionOperations: PermissionOperation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Role;
