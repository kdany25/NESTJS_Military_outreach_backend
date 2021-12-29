import {
  IsEmail,
  IsDate,
  IsIn,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MinLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserAuthDto {
  userId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the user first name',
    default: 'kabalisa',
  })
  firstName: string;

  @ApiProperty({ description: 'This is the user last name', default: 'dany' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'This is the user email',
    default: 'kabadany25@gmai.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'This is the user phone number',
    default: '+250788730199',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'This is the user password',
    default: 'kikitouree',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @ApiProperty({ description: 'This is the user gender', default: 'MALE' })
  @IsNotEmpty()
  @IsIn(['MALE', 'FEMALE', 'OTHER'])
  gender: 'MALE' | 'FEMALE' | 'OTHER';

  @ApiProperty({
    description: 'This is the user date of birth',
    default: '1996-01-16',
  })
  @IsNotEmpty()
  @IsDateString()
  dOb: Date;
}
