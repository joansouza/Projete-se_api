import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import OperationEntity from '@models/Operation/entity';
import PermissionEntity from '@models/Permission/entity';
import RoleEntity from '@models/Role/entity';

@Entity('PermissionOperation')
@Unique('PermissionOperation_unique_permissionId_operationId', [
  'permissionId',
  'operationId',
])
class PermissionOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  permissionId: string;

  @ManyToOne(() => PermissionEntity)
  @JoinColumn({ name: 'permissionId' })
  permission?: PermissionEntity;

  @Column()
  operationId: string;

  @ManyToOne(() => OperationEntity)
  @JoinColumn({ name: 'operationId' })
  operation?: OperationEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}

export default PermissionOperation;
