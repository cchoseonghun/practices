import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/auth.dto';
import { User } from 'src/modules/users/entities/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces/payload.interface';

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

  async generateAccessToken(user: User, isMfaPassed = false): Promise<string> {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isMfaPassed: isMfaPassed,
    }
    return this.jwtService.signAsync(payload);
  }
}