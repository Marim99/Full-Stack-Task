import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/user.schema';
import { UserRepository } from './infrastructure/user.repository';
import  { IUserRepositoryToken } from './domain/user.repository.interface';
import { UserController } from './web/user.controller';
import { UserService } from './application/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserService,
    {
      provide: IUserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepositoryToken],
  controllers: [UserController],
})
export class UserModule {}
