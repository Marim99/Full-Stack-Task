import { Body, Controller, Post, Req,Get,UseGuards } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('api/users')
export class UserController {
constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const user = await this.userService.findById(req.user.id);
    return user;
  }

}
