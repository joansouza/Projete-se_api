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
  
  @Entity('Proposta')
  class Proposta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    valueProposal: string;

    @Column()
    deadLine: string;

    @Column()
    email: string;
    
    @Column()
     phone: string;

    @Column()
    phoneTwo: string;
    
    @Column()
    optionalInfo: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  
  export default Proposta;