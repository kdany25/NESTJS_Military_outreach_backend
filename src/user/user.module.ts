import { Module } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { UserAuthController } from './user.controller';
import { UserAuth } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([UserAuth]),
    AuthModule
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService]
})
export class UserAuthModule {}
