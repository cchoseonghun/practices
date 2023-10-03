import { Body, Controller, Post, Get, Res, UseGuards, Req } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/users.entity';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UsersService, 
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto, 
    @Res({ passthrough: true }) res: Response, 
  ) {
    const user = await this.authService.validateUser(loginDto);
    const access_token = await this.authService.generateAccessToken(user);

    res.cookie('access_token', access_token, {
      httpOnly: true, 
    });
    return {
      message: 'login success', 
      access_token: access_token, 
    };
  }

  @Get('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: any, @Res() res: Response): Promise<any> {
    const userId: number = req.user.id; 
    const verifiedUser: User = await this.userService.findUserById(userId);
    return res.send(verifiedUser);
  }

  @Post('logout')
  @UseGuards(JwtAccessAuthGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    res.clearCookie('access_token');
    return res.send({
      message: 'logout success'
    });
  }
}
