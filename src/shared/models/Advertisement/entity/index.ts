import FileEntity from '@models/File/entity';
import UserEntity from '@models/User/entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Advertisement')
class AdvertisementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  imageCoverId?: string;

  @ManyToOne(() => FileEntity, (file) => file.advertisementImageCovers)
  @JoinColumn({ name: 'imageCoverId' })
  imageCover: FileEntity;

  @Column({ nullable: true })
  imageLogoId?: string;

  @ManyToOne(() => FileEntity, (file) => file.advertisementImageLogos)
  @JoinColumn({ name: 'imageLogoId' })
  imageLogo: FileEntity;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.advertisements)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  name: string;

  @Column({ type: 'integer' })
  reach: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default AdvertisementEntity;
