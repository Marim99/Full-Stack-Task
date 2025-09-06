import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({ example: '1', description: 'User ID' })
   @Expose()
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
   @Expose()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
   @Expose()
  email: string;
}
