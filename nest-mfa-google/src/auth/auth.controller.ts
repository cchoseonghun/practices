import { Body, Controller, Post, Get, Res, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/users.entity';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

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
    const refresh_token = await this.authService.generateRefreshToken(user);

    await this.userService.setCurrentRefreshToken(refresh_token, user.id);

    res.setHeader('Authorization', 'Bearer ' + [access_token, refresh_token]);
    res.cookie('access_token', access_token, {
      httpOnly: true, 
    });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true, 
    });
    return {
      message: 'login success', 
      access_token: access_token, 
      refresh_token: refresh_token, 
    };
  }

  @Get('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async user(@Req() req: any, @Res() res: Response): Promise<any> {
    const userId: number = req.user.id; 
    const verifiedUser: User = await this.userService.findUserById(userId);
    return res.send(verifiedUser);
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshTokenDto)).accessToken;
      res.setHeader('Authorization', 'Bearer ' + newAccessToken);
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
      });
      res.send({newAccessToken});
    } catch(err) {
      throw new UnauthorizedException('Invalid refresh-token');
    }
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    await this.userService.removeRefreshToken(req.user.id);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({
      message: 'logout success'
    });
  }
}
