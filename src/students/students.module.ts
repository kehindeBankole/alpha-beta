import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './repository/students.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from './entity/students.entity';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
  imports: [TypeOrmModule.forFeature([StudentsEntity])],
})
export class StudentsModule {}
