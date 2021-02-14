import {
  Entity,
  AfterLoad,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import appConfig from '@config/appConfig';

@Entity('File')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  ext: string;

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

export default File;
