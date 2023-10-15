import { IsNotEmpty, IsEmail, Matches, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @Length(8, 40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is weak',
  })
  password: string;
  @Matches(/^(admin|moderator)$/, {
    message: 'admin or moderator',
  })
  @IsNotEmpty()
  role: 'admin' | 'moderator';
}
