import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PermissionEntity from '@models/Permission/entity';
import RoleEntity from '@models/Role/entity';

@Entity('RoleGroup')
class RoleGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  routeName: string;

  @Column()
  secret?: string;

  @OneToMany(() => RoleEntity, (role) => role.roleGroupId)
  @JoinTable()
  roles: RoleEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.roleGroup)
  @JoinTable()
  permissions: PermissionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default RoleGroupEntity;
