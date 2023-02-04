import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  @Redirect('localhost:3000', 302)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto) {
    const res = await this.authService.signIn(signInDto);
    if (res.user_info.is_admin) {
      return { url: 'localhost:3000/admin/product' };
    }

    return { url: 'localhost:3000' };
  }
}
