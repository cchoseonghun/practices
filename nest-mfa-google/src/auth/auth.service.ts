import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces/payload.interface';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService, 
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService, 
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // if (!await bcrypt.compare(loginDto.password, user.password)) {   // 비밀번호 암호화 후 사용
    if (loginDto.password !== user.password) {                          // 임시
      throw new BadRequestException('Invalid credentials!');
    }

    return user;
  }

  async generateAccessToken(user: User, isSecondFactorAuthenticated = false): Promise<string> {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isSecondFactorAuthenticated: isSecondFactorAuthenticated,
    }
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: User) {
    const payload: Payload = {
      id: user.id, 
      email: user.email, 
      firstName: user.firstName, 
      lastName: user.lastName, 
    }
    return this.jwtService.signAsync({ id: payload.id }, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'), 
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'), 
    });
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    const { refresh_token } = refreshTokenDto;
    const decodedRefreshToken = this.jwtService.verify(refresh_token, { secret: process.env.JWT_REFRESH_SECRET });
    const userId = decodedRefreshToken.id;
    const user = await this.userService.getUserIfRefreshTokenMatches(refresh_token, userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }
    const accessToken = await this.generateAccessToken(user);
    return {accessToken};
  }
}