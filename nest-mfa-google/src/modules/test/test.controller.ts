import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JwtTwoFactorGuard from 'src/auth/guards/jwt-mfa.guard';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';

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
