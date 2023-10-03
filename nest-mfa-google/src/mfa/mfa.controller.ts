import { Body, ClassSerializerInterceptor, Controller, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { MfaService } from './mfa.service';
import { JwtAccessAuthGuard } from 'src/auth/guards/jwt-access.guard';
import { Response } from 'express';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { MfaDto } from './dtos/mfa.dto';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/mfa')
@UseInterceptors(ClassSerializerInterceptor)
export class MfaController {
  constructor(
    private readonly mfaService: MfaService, 
    private readonly userService: UsersService, 
    private readonly authService: AuthService, 
  ) {}

  @Post('generate')
  @UseGuards(JwtAccessAuthGuard)
  async register(
    @Res() res: Response, 
    @Req() req: RequestWithUser
  ) {
    const { otpAuthUrl } = await this.mfaService.generateMfaSecret(req.user);
    return await this.mfaService.pipeQrCodeStream(res, otpAuthUrl);
  }

  @Post('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async authenticate(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    await this.mfaCodeValidation(mfaDto.mfaCode, req.user);
    req.user.isMfaPassed = true;
    const mfa_token = await this.authService.generateAccessToken(req.user, true);

    req.res.cookie('mfa_token', mfa_token, {
      httpOnly: true,
      path: '/',
    });
    return req.user;
  }

  private async mfaCodeValidation(mfaCode: MfaDto['mfaCode'], user: RequestWithUser['user']) {
    const isCodeValidated = await this.mfaService.isMfaCodeValid(mfaCode, user);
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
  }
}
