import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from '@models/User/entity';
import StateEntity from '@models/State/entity';

@Entity('District')
class District {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name?: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ unique: true, length: 10 })
  ibgeCode: string;

  @Column({ length: 255 })
  cityName?: string;

  @Column()
  cityId: string;

  @ManyToOne(() => StateEntity)
  @JoinColumn({ name: 'cityId' })
  city?: StateEntity;

  @OneToMany(() => UserEntity, (permission) => permission.districtId)
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default District;
