/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    // eslint-disable-next-line prettier/prettier
    UpdateDateColumn, 
  } from 'typeorm';
  
  @Entity('Categoria')
  class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    name: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  
  export default Categoria;