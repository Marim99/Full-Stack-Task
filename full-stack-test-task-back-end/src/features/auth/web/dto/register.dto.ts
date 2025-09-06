import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  name: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[A-Za-z])/, { message: 'Password must contain at least one letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$!%*#?&^_-])/, { message: 'Password must contain at least one special character' })
  password: string;
}
