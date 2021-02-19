import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from '@models/User/entity';
import PermissionOperationEntity from '@models/PermissionOperation/entity';
import RoleGroupEntity from '@models/RoleGroup/entity';
import Permission from '@models/Permission/entity';

@Entity('Role')
@Unique('Role_unique_roleGroupId_name', ['roleGroupId', 'name'])
class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  roleGroupId: string;

  @ManyToOne(() => RoleGroupEntity, (roleGroupEntity) => roleGroupEntity.roles)
  @JoinColumn({ name: 'roleGroupId' })
  roleGroup?: RoleGroupEntity;

  @ManyToMany(() => UserEntity, (userEntity) => userEntity.roles)
  @JoinTable()
  @JoinTable({
    name: 'UserRole',
  })
  users: UserEntity[];

  @ManyToMany(
    () => PermissionOperationEntity,
    (permissionOperationEntity) => permissionOperationEntity.roles
  )
  @JoinTable({
    name: 'RolePermissionOperation',
  })
  permissionOperations: PermissionOperationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  permissions?: Permission[];
}

export default RoleEntity;
