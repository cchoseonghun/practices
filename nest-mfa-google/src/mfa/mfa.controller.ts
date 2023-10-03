import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
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
    @Req() request: RequestWithUser
  ) {
    const { otpAuthUrl } = await this.mfaService.generateMfaSecret(request.user);
    return await this.mfaService.pipeQrCodeStream(res, otpAuthUrl);
  }

  @Post('turn-on')
  @UseGuards(JwtAccessAuthGuard)
  async turnOnMfa(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isMfaCodeValid(
      mfaDto.mfaCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.userService.turnOnMfa(req.user.id);
    return {
      msg: "MFA turned on"
    }
  }

  @Post('turn-off')
  @UseGuards(JwtAccessAuthGuard)
  async turnOffMfa(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isMfaCodeValid(
      mfaDto.mfaCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.userService.turnOffMfa(req.user.id);
    return {
      msg: "MFA turned off"
    }
  }

  @Post('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async authenticate(
    @Req() req: RequestWithUser,
    @Body() mfaDto: MfaDto
  ) {
    const isCodeValidated = await this.mfaService.isMfaCodeValid(
      mfaDto.mfaCode, req.user
    );
    if (!req.user.isMfaEnabled) {
      throw new ForbiddenException('MFA is not enabled');
    }
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    req.user.isMfaPassed = true;
    const tfa_accessToken = await this.authService.generateAccessToken(req.user, true);
    req.res.cookie('mfa_token', tfa_accessToken, {
      httpOnly: true,
      path: '/',
    });
    return req.user;
  }
}
