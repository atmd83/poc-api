import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserVerifyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The users siwe prepared message',
  })
  message: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The signature to verify against the message',
  })
  signature: string;
}

export class UserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The users email',
    example: 'test@testmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The users username',
    example: 'big_dave_83',
  })
  username: string;

  @ApiProperty({
    description: 'The users profile bio/description',
    example: 'Hi my names Dave, I live in Spain.',
  })
  bio: string;

  @ApiProperty({
    description: 'The users public address',
    example: '0x356356735735',
  })
  address: string;
}

export class UserUpdateDto {
  @IsEmail()
  @ApiProperty({
    description: 'The users email',
    example: 'test@testmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The users username',
    example: 'big_dave_83',
  })
  username: string;

  @ApiProperty({
    description: 'The users profile bio/description',
    example: 'Hi my names Dave, I live in Spain.',
  })
  bio: string;
}
