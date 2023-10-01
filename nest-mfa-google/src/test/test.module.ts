import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import JwtTwoFactorGuard from 'src/auth/jwt-mfa.guard';
import { JwtTwoFactorStrategy } from 'src/auth/jwt-mfa.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [TestController], 
  providers: [UsersService, JwtTwoFactorGuard, JwtTwoFactorStrategy]
})
export class TestModule {}
