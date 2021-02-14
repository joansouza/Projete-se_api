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
import User from '@models/User';

@Entity('Country')
class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 80 })
  capslockName: string;

  @Column({ unique: true, length: 80 })
  name?: string;

  @Column({ unique: true, length: 2 })
  iso: string;

  @Column({ unique: true, length: 3, nullable: true })
  iso3: string;

  @Column({ nullable: true })
  numCode: number;

  @Column()
  phonecode: number;

  @OneToMany(() => User, (permission) => permission.countryId)
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Country;
