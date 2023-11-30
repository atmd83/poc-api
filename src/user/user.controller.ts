import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { generateNonce, SiweMessage } from 'siwe';

import { UserService } from './user.service';
import { UserDto, UserVerifyDto, UserUpdateDto } from './user.dto';

@ApiTags('User Authentication and profile.')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiResponse({
    type: UserDto,
    description: 'Endpoint return the users profile data',
  })
  async getUser(@Req() request: any) {
    console.log('GET', request.session.siwe);
    if (!request.session.siwe) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const address = request.session.siwe.address;
    const user = await this.userService.user({ address });

    return user;
  }

  @Put('/')
  @ApiBody({
    type: UserUpdateDto,
    description:
      'A user can update their bio, username and email on the platform. ',
  })
  async updateUser(@Body() body: UserUpdateDto, @Req() request: any) {
    if (!request.session.siwe) {
      return { message: 'You are not logged in' };
    }

    const address = request.session.siwe.address;
    const user = await this.userService.updateUser({ address }, body);

    return user;
  }

  @Get('/nonce')
  @ApiResponse({
    type: String,
    description: 'Endpoint to generate a nonce',
  })
  async generateNonce(@Req() request: any) {
    request.session.nonce = generateNonce();
    console.log('nonce', request.session.nonce);
    await request.session.save();
    return request.session.nonce;
  }

  @Post('/verify')
  @ApiBody({
    type: UserVerifyDto,
    description: 'Endpoint to verify a user with siwe',
  })
  async verifyMessage(@Body() body: UserVerifyDto, @Req() request: any) {
    const { signature } = body;
    const msg = body.message;

    console.log('verify', msg, signature);

    try {
      console.log('TRY', msg);
      const siwe = new SiweMessage(msg);

      const { data: message } = await siwe.verify({
        signature,
        nonce: request.session.nonce,
      });

      request.session.siwe = message;
      console.log('SAVE', request.session.siwe);
      request.session.cookie.expires = new Date(message.expirationTime);
      await request.session.save();

      const user = await this.userService.user({
        address: request.session.siwe.address,
      });

      if (!user) {
        this.userService.createUser({
          address: request.session.siwe.address,
        });
      }

      return true;
    } catch (e) {
      request.session.siwe = null;
      request.session.nonce = null;
      await request.session.save();
      console.error(e);
      return false;
    }
  }
}
