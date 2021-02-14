import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@models/User';
import Region from '@models/Region';
import Country from '@models/Country';

@Entity('State')
class State {
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

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'regionId' })
  region?: Region;

  @Column()
  countryId: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId' })
  country?: Country;

  @OneToMany(() => User, (permission) => permission.stateId)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default State;
