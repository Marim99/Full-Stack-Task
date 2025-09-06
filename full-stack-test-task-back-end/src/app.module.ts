import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './features/users/user.module';
import { AuthModule } from './features/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: 'logs/app.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    }),
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
