import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from '@models/User/entity';

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

  @OneToMany(() => UserEntity, (permission) => permission.countryId)
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Country;
