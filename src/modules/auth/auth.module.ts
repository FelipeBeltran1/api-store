import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/@common/strategys/local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
