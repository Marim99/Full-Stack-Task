import { Module } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthController } from '../web/auth.controller';

@Module({
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
