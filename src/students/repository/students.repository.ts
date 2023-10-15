import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StudentsEntity } from '../entity/students.entity';
import { CreateStudentDto } from '../dto/create-student.dto';
import { FilterStudentsDto } from '../dto/filter-student.dto';

@Injectable()
export class StudentsRepository extends Repository<StudentsEntity> {
  constructor(private dataSource: DataSource) {
    super(StudentsEntity, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    const studentByEmail = await this.findOneBy({
      email: createStudentDto.email,
    });

    if (studentByEmail) {
      throw new ConflictException('User already exist');
    }
    const student = this.create(createStudentDto);
    await this.save(student);
    return student;
  }

  async getAllStudents(filterStudentsDto: FilterStudentsDto) {
    const { email } = filterStudentsDto;

    const query = this.createQueryBuilder('students');

    if (email) {
      query.andWhere('students.email = :email', { email });
    }
    const students = await query.getMany();
    return students;
  }

  async getStudent(id: string) {
    const student = await this.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('student not found');
    }
    return student;
  }

  async deleteStudent(id: string) {
    const student = await this.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('student not found');
    }
    await this.delete(id);
  }
}
