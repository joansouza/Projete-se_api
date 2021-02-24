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
import { Response } from 'express';

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

  updateSession(response: Response, options?: { noClientToken?: boolean }) {
    const loginDate = new Date().getTime();

    // const expires = new Date();
    // expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
    function createCookie(isServer: boolean, token: string) {
      response.cookie(isServer ? 'serverToken' : 'clientToken', token, {
        httpOnly: isServer,
        sameSite: true,
        // expires,
        path: '/',
      });
    }

    if (!options?.noClientToken) {
      const clientToken = sign(
        { loginDate, isClientToken: true },
        authConfig.secretKey,
        {
          subject: this.id,
        }
      );

      createCookie(false, clientToken);

      this.sessionData = { ...this.sessionData, clientToken };
    }

    const serverToken = sign(
      { loginDate, isServerToken: true },
      authConfig.secretKey,
      {
        subject: this.id,
      }
    );
    createCookie(true, serverToken);

    this.sessionData = { ...this.sessionData, serverToken };
  }
}

export default UserEntity;
