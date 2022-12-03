import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }
  async getUser(getUserArgs: Partial<User>) {
    return this.userRepository.findOne(getUserArgs);
  }
  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }
  async createUser(
    email: string,
    age: number,
    password: string,
  ): Promise<User> {
    await this.validateCreateUserRequest({ email, password, age });
    return this.userRepository.create({
      userId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
      password: this.bcryptService.genHash(password),
    });
  }
  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, userUpdates);
  }
  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        email: request.email,
      });
    } catch (err) {
      throw new InternalServerErrorException();
    }
    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = this.bcryptService.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credential is not valid');
    }
    return user;
  }
}
