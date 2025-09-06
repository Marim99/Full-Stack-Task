import { Controller, Req,Get,UseGuards,Logger } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('api/users')
export class UserController {
private readonly logger = new Logger(UserService.name);
constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    const user = await this.userService.findById(req.user.id);
    return user;
  }

}
