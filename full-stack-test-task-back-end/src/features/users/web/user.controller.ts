import {
  Controller,
  Req,
  Get,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('api/users')
@ApiBearerAuth('bearer')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({ type: UserDto, description: 'Current user profile' })
  async getProfile(@Req() req: any): Promise<UserDto | null> {
    const user = await this.userService.findById(req.user.id);
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }
}
