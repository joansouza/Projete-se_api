import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import RoleGroup from '@models/RoleGroup';
import PermissionOperation from '@models/PermissionOperation';

@Entity('Permission')
@Unique('uniqueRouteNameRoleGroup', ['roleGroupId', 'routeName'])
@Unique('uniqueNameRoleGroup', ['roleGroupId', 'name'])
class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleGroupId: string;

  @ManyToOne(() => RoleGroup)
  @JoinColumn({ name: 'roleGroupId' })
  roleGroup?: RoleGroup;

  @Column()
  permissionId: string;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permission?: Permission;

  @OneToMany(() => Permission, (permission) => permission.permissionId)
  @JoinColumn({ name: 'permissionId' })
  permissions?: Permission;

  @Column()
  name: string;

  @Column()
  routeName: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  operations: Permission[];

  @OneToMany(
    () => PermissionOperation,
    (permissionOperation) => permissionOperation.operationId
  )
  @JoinTable()
  permissionOperations: Permission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Permission;
