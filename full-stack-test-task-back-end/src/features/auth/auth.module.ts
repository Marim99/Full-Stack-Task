import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './application/auth.service';
import { AuthController } from './web/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
