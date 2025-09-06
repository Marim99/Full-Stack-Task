import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './features/users/user.module';
import { AuthModule } from './features/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI && process.env.DB_NAME
      ? `${process.env.MONGO_URI}/${process.env.DB_NAME}`
      : 'mongodb://127.0.0.1:27017/myapp',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
