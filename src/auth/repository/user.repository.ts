import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);

    const adminByEmail = await this.findOneBy({
      email: createUserDto.email,
    });
    if (adminByEmail) {
      throw new ConflictException('User already exist');
    }
    const admin = this.create(createUserDto);

    try {
      await this.save({
        ...admin,
        password,
      });
      return admin;
    } catch (error) {}
  }
}
