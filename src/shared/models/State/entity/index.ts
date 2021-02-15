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
import RegionEntity from '@models/Region/entity';
import CountryEntity from '@models/Country/entity';

@Entity('State')
class StateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  name?: string;

  @Column({ unique: true, length: 2 })
  uf: string;

  @Column({ unique: true, length: 2 })
  ibgeCode: string;

  @Column()
  regionId: string;

  @ManyToOne(() => RegionEntity)
  @JoinColumn({ name: 'regionId' })
  region?: RegionEntity;

  @Column()
  countryId: string;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;

  @OneToMany(() => UserEntity, (permission) => permission.stateId)
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default StateEntity;
