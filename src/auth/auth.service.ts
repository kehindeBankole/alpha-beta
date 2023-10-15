import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { UserSignInDto } from './dto/UserSignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async userLogin(userLoginDto: UserSignInDto) {
    const user = await this.userRepo.findOneBy({ email: userLoginDto.email });

    if (user && (await bcrypt.compare(userLoginDto.password, user.password))) {
      const token = this.jwtService.sign({
        role: user.role,
        email: user.email,
      });
      return { token };
    } else {
      throw new UnauthorizedException('check your details properly');
    }
  }

  addUser(createUserDto: CreateUserDto) {
    return this.userRepo.createUser(createUserDto);
  }
}
