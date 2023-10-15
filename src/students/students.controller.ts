import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { FilterStudentsDto } from './dto/filter-student.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    const data = await this.studentService.createStudent(createStudentDto);
    return data;
  }

  @Get()
  async getAllStudents(@Query() filterStudentsDto: FilterStudentsDto) {
    const data = await this.studentService.getAllStudents(filterStudentsDto);
    return data;
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    await this.studentService.deleteStudent(id);
    return 'data deleted';
  }

  @Get(':id')
  async getStudent(@Param('id') id: string) {
    const student = await this.studentService.getStudent(id);
    return student;
  }
}
