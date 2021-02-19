import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PermissionOperationEntity from '@models/PermissionOperation/entity';
import PermissionEntity from '@models/Permission/entity';

@Entity('Operation')
class Operation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  method?: string;

  @Column()
  requireId?: boolean;

  @Column({ nullable: true })
  secret?: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable({
    name: 'PermissionOperation',
  })
  permissions: PermissionEntity[];

  @OneToMany(
    () => PermissionOperationEntity,
    (permissionOperation) => permissionOperation.operation
  )
  // @JoinTable()
  permissionOperations: PermissionOperationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async setMethod() {
    if (this.method) {
      this.method = this.method.toUpperCase();
    }
  }
}

export default Operation;
