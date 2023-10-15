import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsRepository } from './repository/students.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterStudentsDto } from './dto/filter-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsRepository)
    private studentsRepository: StudentsRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const data = await this.studentsRepository.createStudent(createStudentDto);
    return data;
  }

  async getAllStudents(filterStudentsDto: FilterStudentsDto) {
    const data =
      await this.studentsRepository.getAllStudents(filterStudentsDto);
    return data;
  }

  async getStudent(id: string) {
    const data = await this.studentsRepository.getStudent(id);
    return data;
  }

  async deleteStudent(id: string) {
    await this.studentsRepository.deleteStudent(id);
  }
}
