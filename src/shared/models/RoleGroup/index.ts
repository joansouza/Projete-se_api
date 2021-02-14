import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import Permission from '../Permission';
import Role from '../Role';

@Entity('RoleGroup')
class RoleGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  routeName: string;

  @Column()
  secret?: string;

  @OneToMany(() => Role, (role) => role.roleGroupId)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Permission, (permission) => permission.roleGroupId)
  @JoinTable()
  permissions: Permission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default RoleGroup;
