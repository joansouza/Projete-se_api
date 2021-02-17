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

@Entity('Role')
@Unique('Role_unique_roleGroupId_name', ['roleGroupId', 'name'])
class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  roleGroupId: string;

  @ManyToOne(() => RoleGroupEntity)
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
  @JoinTable()
  permissionOperations: PermissionOperationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default RoleEntity;
