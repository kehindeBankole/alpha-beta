import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  gender: 'male' | 'female';
  @Column()
  class: string;
  @Column()
  exam: string;
}
