import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAuthService } from './user.service';
import { CreateUserAuthDto } from './dto/create-user.dto';
import { UpdateUserAuthDto } from './dto/update-user.dto';
import {
  ApiAcceptedResponse,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseProperty,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserAuth } from './entities/user.entity';
import { map, Observable } from 'rxjs';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post()
  create(@Body() createUserAuthDto: CreateUserAuthDto) {
    return this.userAuthService.create(createUserAuthDto);
  }

  @Get()
  findAll() {
    return this.userAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAuthService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAuthDto: UpdateUserAuthDto,
  ) {
    return this.userAuthService.update(id, updateUserAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAuthService.remove(id);
  }

  @Post('login')
  login(@Body() user: UserAuth): Observable<Object> {
    return this.userAuthService.login(user).pipe(
      map((jwt: string) => {
        return { acces_token: jwt };
      }),
    );
  }
}
