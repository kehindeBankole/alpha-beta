import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import { GenderValidation } from '../validation/student-validation';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(11, 11)
  phone: string;
  @IsNotEmpty()
  @Validate(GenderValidation, {
    message: 'gender can only be male or female',
  })
  gender: 'male' | 'female';
  @IsNotEmpty()
  class: string;
  @IsNotEmpty()
  exam: string;
}
