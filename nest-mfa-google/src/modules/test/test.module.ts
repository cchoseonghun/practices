import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/users.entity';
import JwtTwoFactorGuard from 'src/auth/guards/jwt-mfa.guard';
import { JwtTwoFactorStrategy } from 'src/auth/guards/jwt-mfa.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [TestController], 
  providers: [UsersService, JwtTwoFactorGuard, JwtTwoFactorStrategy]
})
export class TestModule {}
