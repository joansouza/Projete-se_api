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
import Operation from '@models/Operation/entity';

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
  permissionId?: string;

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

  @ManyToMany(() => Operation, (operation) => operation.permissions)
  operations: Operation[];

  @OneToMany(
    () => PermissionOperationEntity,
    (permissionOperation) => permissionOperation.operationId
  )
  @JoinTable({
    name: 'PermissionOperation',
  })
  permissionOperations: PermissionOperationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Permission;
