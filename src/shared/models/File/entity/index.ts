import {
  AfterLoad,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import appConfig from '@config/appConfig';
import ProjectEntity from '@models/Project/entity';
import AdvertisementEntity from '@models/Advertisement/entity';

@Entity('File')
class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  ext: string;

  @OneToMany(() => ProjectEntity, (projectEntity) => projectEntity.imageCover)
  projects: ProjectEntity[];

  @OneToMany(
    () => AdvertisementEntity,
    (advertisement) => advertisement.imageCover
  )
  advertisementImageCovers: AdvertisementEntity[];

  @OneToMany(
    () => AdvertisementEntity,
    (advertisement) => advertisement.imageLogo
  )
  advertisementImageLogos: AdvertisementEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  url?: string;

  @AfterLoad()
  private setUrl() {
    this.url = `${appConfig.baseUrl}/files/${this.filename}`;
  }
}

export default FileEntity;
