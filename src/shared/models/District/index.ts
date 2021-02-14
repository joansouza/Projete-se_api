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

  @ManyToOne(() => State)
  @JoinColumn({ name: 'cityId' })
  city?: State;

  @OneToMany(() => User, (permission) => permission.districtId)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default District;
