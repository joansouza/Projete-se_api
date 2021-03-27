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
import District from '@models/District/entity';

@Entity('City')
class CityEntity {
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

  @ManyToOne(() => StateEntity)
  @JoinColumn({ name: 'stateId' })
  state?: StateEntity;

  @OneToMany(() => District, (district) => district.cityId)
  @JoinTable()
  districts: District[];

  @OneToMany(() => UserEntity, (permission) => permission.cityId)
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default CityEntity;
