import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import File from '@models/File';
import bcrypt from 'bcryptjs';
import { IUserSessionField } from './entityUtils/interfaces';
import authConfig from '@config/authConfig';
import { sign } from 'jsonwebtoken';
import Role from '@models/Role';
import Country from '@models/Country';
import State from '@models/State';
import City from '@models/City';
import District from '@models/District';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @Column({ type: 'json' })
  sessionData: IUserSessionField;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Column()
  avatarId?: string;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'avatarId' })
  avatar?: File;

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

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId' })
  country?: Country;

  @Column()
  stateId?: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'stateId' })
  state?: State;

  @Column()
  cityId?: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'cityId' })
  city?: City;

  @Column()
  districtName?: string;

  @Column({ nullable: true })
  districtId?: string;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'districtId' })
  district?: District;

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

export default User;
