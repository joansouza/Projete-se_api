import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import RoleGroupEntity from '@models/RoleGroup/entity';
import PermissionOperationEntity from '@models/PermissionOperation/entity';

@Entity('Permission')
@Unique('Permission_unique_roleGroupId_name', ['roleGroupId', 'name'])
@Unique('Permission_unique_roleGroupId_routeName', ['roleGroupId', 'routeName'])
class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleGroupId: string;

  @ManyToOne(() => RoleGroupEntity)
  @JoinColumn({ name: 'roleGroupId' })
  roleGroup?: RoleGroupEntity;

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
    () => PermissionOperationEntity,
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
