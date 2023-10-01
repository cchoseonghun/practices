import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { MfaService } from './mfa.service';
import { JwtAccessAuthGuard } from 'src/auth/jwt-access.guard';
import { Response } from 'express';
import { RequestWithUser } from 'src/interfaces/requestWithUser.interface';
import { MfaDto } from './mfa.dto';
import { UsersService } from 'src/users/users.service';
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
    @Req() request: RequestWithUser
  ) {
    const { otpAuthUrl } = await this.mfaService.generateMfaSecret(request.user);
    return await this.mfaService.pipeQrCodeStream(res, otpAuthUrl);
  }

  @Post('turn-on')
  @UseGuards(JwtAccessAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isTwoFactorAuthenticationCodeValid(
      mfaDto.twoFactorAuthenticationCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.userService.turnOnTwoFactorAuthentication(req.user.id);
    return {
      msg: "TwoFactorAuthentication turned on"
    }
  }

  @Post('turn-off')
  @UseGuards(JwtAccessAuthGuard)
  async turnOffTwoFactorAuthentication(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isTwoFactorAuthenticationCodeValid(
      mfaDto.twoFactorAuthenticationCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.userService.turnOffTwoFactorAuthentication(req.user.id);
    return {
      msg: "TwoFactorAuthentication turned off"
    }
  }

  @Post('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async authenticate(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isTwoFactorAuthenticationCodeValid(
      mfaDto.twoFactorAuthenticationCode, req.user
    );
    if (!req.user.isTwoFactorAuthenticationEnabled) {
      throw new ForbiddenException('Two-Factor Authentication is not enabled');
    }
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    req.user.isSecondFactorAuthenticated = true;
    const tfa_accessToken = await this.authService.generateAccessToken(req.user, true);
    req.res.cookie('two_fa_token', tfa_accessToken, {
      httpOnly: true,
      path: '/',
    });
    return req.user;
  }
}
