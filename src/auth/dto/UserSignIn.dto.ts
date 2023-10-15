import { IsEmail, Length } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  email: string;

  @Length(8, 40)
  password: string;
}
