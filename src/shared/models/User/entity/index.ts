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
  OneToMany,
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
import cpfValidator from 'shared/validators/cpfValidator';
import AppError from '@errors/AppError';
import emailValidator from 'shared/validators/emailValidator';
import passwordValidator from 'shared/validators/passwordValidator';
import maskUtils from '@utils/maskUtils';
import { getCityRespository } from '@models/City/repository';
import { getStateRespository } from '@models/State/repository';
import ProjectProposalEntity from '@models/ProjectProposal/entity';
import ProjectEntity from '@models/Project/entity';
import UserRatingEntity from '@models/UserRating/entity';
import AdvertisementEntity from '@models/Advertisement/entity';

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

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'UserRole',
  })
  roles: RoleEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];

  @OneToMany(
    () => ProjectProposalEntity,
    (projectProposal) => projectProposal.user
  )
  projectProposals: ProjectProposalEntity[];

  @OneToMany(() => UserRatingEntity, (userRating) => userRating.ratedUser)
  userRatings: UserRatingEntity[];

  @OneToMany(() => UserRatingEntity, (userRating) => userRating.userEvaluator)
  userEvaluations: UserRatingEntity[];

  @OneToMany(() => AdvertisementEntity, (advertisement) => advertisement.user)
  advertisements: AdvertisementEntity[];

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
  address?: string;

  @Column()
  addressNumber?: string;

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
  private async handlePassword() {
    const loadedPassword = Object.getOwnPropertyDescriptor(
      this,
      '_loadedPassword'
    )?.value;
    if (this.password && this.password !== loadedPassword) {
      const passwordCheck = passwordValidator(this?.password);
      if (!passwordCheck.isValid) {
        throw new AppError({
          message: passwordCheck.invalidMessage,
          statusCod: 400,
          userFriendly: true,
        });
      }
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  @BeforeInsert()
  private async newUserValidation() {
    this.countryId = undefined;
    this.zipCode = maskUtils.setOnlyNumber(this.zipCode);
    this.cpf = maskUtils.setOnlyNumber(this.cpf);

    let message: string | undefined = undefined;

    function validLength(data: any, size: number, exact?: boolean) {
      return typeof data === 'string' && exact
        ? data.length === size
        : data.length >= size;
    }

    const stateRepository = getStateRespository();
    const cityRepository = getCityRespository();
    const state =
      this?.stateId &&
      (await stateRepository
        .findOne({ where: { id: this?.stateId } })
        .catch(() => undefined));
    const city =
      this?.cityId &&
      (await cityRepository
        .findOne({ where: { id: this?.cityId } })
        .catch(() => undefined));

    const thisDate = new Date();
    thisDate.setFullYear(thisDate.getFullYear() - 16);
    const idadeMinima = thisDate.getTime();
    const nascimento = this?.birthday && new Date(this.birthday).getTime();

    console.log(this.zipCode);
    if (!nascimento || nascimento > idadeMinima)
      message = 'É preciso ter pelo menos 16 anos.';
    else if (!cpfValidator(this?.cpf)) message = 'CPF inválido.';
    else if (!emailValidator(this?.email)) message = 'Email inválido.';
    else if (!validLength(this?.name, 3))
      message = 'O nome precisa ter pelo menos 3 caracteres.';
    else if (!validLength(this.zipCode, 8, true))
      message = 'O CEP deve ter 8 dígitos.';
    else if (!state) message = 'Informe o estado.';
    else if (!city) message = 'Informe a cidade.';
    else if (!this?.districtName) message = 'Informe o bairro.';
    else if (!this?.address) message = 'Informe o endereço.';
    else if (!this?.addressNumber) message = 'Informe o número do endereço.';

    if (message) {
      throw new AppError({
        message,
        statusCod: 400,
        userFriendly: true,
      });
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
