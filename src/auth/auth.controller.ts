import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserSignInDto } from './dto/UserSignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async addUser(@Body() createUserDto: CreateUserDto) {
    const signin = await this.authService.addUser(createUserDto);
    return signin;
  }

  @Post('login')
  async login(@Body() userLoginDto: UserSignInDto) {
    const signin = await this.authService.userLogin(userLoginDto);
    return signin;
  }
}
