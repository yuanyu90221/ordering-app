import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Post()
  async createUser(@Body() createUSerDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUSerDto.email,
      createUSerDto.age,
      createUSerDto.password,
    );
  }
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
