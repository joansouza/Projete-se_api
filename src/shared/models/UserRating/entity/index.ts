import AppError from '@errors/AppError';
import UserEntity from '@models/User/entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('UserRating')
class UserRatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ratedUserId: string;

  @ManyToOne(() => UserEntity, (user) => user.userRatings)
  @JoinColumn({ name: 'ratedUserId' })
  ratedUser: UserEntity;

  @Column()
  userEvaluatorId: string;

  @ManyToOne(() => UserEntity, (user) => user.userEvaluations)
  @JoinColumn({ name: 'userEvaluatorId' })
  userEvaluator: UserEntity;

  @Column({ type: 'double precision' })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async validateData() {
    if (this.rating < 0 || this.rating > 5) {
      throw new AppError({
        message: 'A avaliação de um usuário deve ser de 0 até 5.',
        statusCod: 400,
        userFriendly: true,
      });
    }
  }
}

export default UserRatingEntity;
