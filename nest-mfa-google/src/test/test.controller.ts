import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/jwt-mfa.guard';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Controller('api/test')
export class TestController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtTwoFactorGuard)
  @Get('twofactor')
  async test2fa(@Req() req: any) {
    const user: User = await this.userService.findUserById(req.user.id);
    return user;
  }
}
