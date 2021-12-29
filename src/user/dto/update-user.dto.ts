import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthDto } from './create-user.dto';

export class UpdateUserAuthDto extends PartialType(CreateUserAuthDto) {}
