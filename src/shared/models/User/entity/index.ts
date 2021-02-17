import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import authConfig from '@config/authConfig';
import { sign } from 'jsonwebtoken';
import FileEntity from '@models/File/entity';
import RoleEntity from '@models/Role/entity';
import CountryEntity from '@models/Country/entity';
import StateEntity from '@models/State/entity';
import CityEntity from '@models/City/entity';
import DistrictEntity from '@models/District/entity';
import { UserSessionFieldType } from '../types';

@Entity('User')
/** Avoid using global typeorm repository on thisEntity */
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: 'json' })
  sessionData: UserSessionFieldType;

  @ManyToMany(() => RoleEntity, (roleEntity) => roleEntity.users)
  @JoinTable({
    name: 'UserRole',
  })
  roles: RoleEntity[];

  @Column()
  avatarId?: string;

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'avatarId' })
  avatar?: FileEntity;

  @Column()
  name: string;

  @Column()
  birthday?: string;

  @Column()
  cpf?: string;

  @Column()
  zipCode?: string;

  @Column()
  countryId?: string;

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'countryId' })
  country?: CountryEntity;

  @Column()
  stateId?: string;

  @ManyToOne(() => StateEntity)
  @JoinColumn({ name: 'stateId' })
  state?: StateEntity;

  @Column()
  cityId?: string;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: 'cityId' })
  city?: CityEntity;

  @Column()
  districtName?: string;

  @Column({ nullable: true })
  districtId?: string;

  @ManyToOne(() => DistrictEntity)
  @JoinColumn({ name: 'districtId' })
  district?: DistrictEntity;

  @CreateDateColumn({ update: false })
  readonly createdAt: Date;

  @UpdateDateColumn({ update: false })
  readonly updatedAt: Date;

  @DeleteDateColumn({ update: false })
  readonly deletedAt: Date;

  @AfterLoad()
  private loadPassword() {
    Object.defineProperty(this, '_loadedPassword', {
      value: this.password,
      writable: false,
      configurable: true,
      enumerable: false,
    });
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const loadedPassword = Object.getOwnPropertyDescriptor(
      this,
      '_loadedPassword'
    )?.value;
    if (this.password && this.password !== loadedPassword) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  updateSession() {
    const loginDate = new Date().getTime();

    const token = sign({ loginDate }, authConfig.secretKey, {
      subject: this.id,
    });

    this.sessionData = { loginDate, token };
  }
}

export default UserEntity;
