import { Body, Controller, Post, Req,Get,UseGuards } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.name , dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
  @Post('logout')
  async logout(@Req() req: any) {
    return { message: 'Logged out successfully' };
  }
}
