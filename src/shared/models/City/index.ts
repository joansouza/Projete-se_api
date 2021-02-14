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
import State from '@models/State';

@Entity('City')
class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name?: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ unique: true, length: 7 })
  ibgeCode: string;

  @Column()
  stateId: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId' })
  state?: State;

  @OneToMany(() => User, (permission) => permission.cityId)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default City;
