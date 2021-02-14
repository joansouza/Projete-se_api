import Operation from '@models/Operation';
import Permission from '@models/Permission';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import Role from '../Role';

@Entity('PermissionOperation')
@Unique('uniquePermissionOperation', ['permissionId', 'operationId'])
class PermissionOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  permissionId: string;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permission?: Permission;

  @Column()
  operationId: string;

  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'operationId' })
  operation?: Operation;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}

export default PermissionOperation;
