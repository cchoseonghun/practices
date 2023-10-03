import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { toFileStream } from 'qrcode';

@Injectable()
export class MfaService {
  constructor(
    private readonly userService: UsersService, 
    private readonly configService: ConfigService, 
  ) {}

  public async generateMfaSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(user.email, this.configService.get('MFA_APP_NAME'), secret);
    await this.userService.setMfaSecret(secret, user.id);
    
    return {
      secret, 
      otpAuthUrl, 
    }
  }

  public async pipeQrCodeStream(stream: Response, otpAuthUrl: string): Promise<void> {
    stream.setHeader('content-type','image/png');  // qrcode image 생성을 위해 추가
    return toFileStream(stream, otpAuthUrl);
  }

  public async isMfaCodeValid(mfaCode: string, user: User) {
    if (!user.mfaSecret) {
      return false; // 혹은 다른 예외 처리 가능
    }
    // otplib에서 불러온 authenticator의 verify 메서드를 사용해 올바른 인증 코드인지를 검증
    // 이때, 클라이언트에서 받아온 인증 코드와 서버에 저장된 시크릿 키를 사용한다.
    return authenticator.verify({
      token: mfaCode,
      secret: user.mfaSecret,
    })
  }
}
