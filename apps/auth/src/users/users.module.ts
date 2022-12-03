import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BcryptModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
