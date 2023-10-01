import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtAccessAuthGuard } from './jwt-access.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        } 
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtRefreshStrategy, JwtAccessAuthGuard, JwtRefreshGuard], 
})
export class AuthModule {}
