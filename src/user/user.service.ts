import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { CreateUserAuthDto } from './dto/create-user.dto';
import { UpdateUserAuthDto } from './dto/update-user.dto';
import { UserAuth } from './entities/user.entity';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepository: Repository<UserAuth>,
    private authService: AuthService,
  ) {}

  async create(createUserAuthDto: CreateUserAuthDto): Promise<UserAuth> {
    try {
      const { password, ...rest } = createUserAuthDto;
      const hash = await this.encryptPassword(password);
      const user = { userId: uuid(), password: hash, ...rest };
      await this.userRepository.save(user);

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UserAuth[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserAuth> {
    return await this.userRepository.findOne(id);
  }

  update(id: string, updateUserAuthDto: UpdateUserAuthDto) {
    return `This action updates a #${id} userAuth`;
  }

  remove(id: string) {
    return `This action removes a #${id} userAuth`;
  }

  async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  login(user: UserAuth): Observable<string> {
    return this.validate(user.email, user.password).pipe(
      switchMap((user: UserAuth) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'wrong credentials';
        }
      }),
    );
  }

  validate(email: string, password: string): Observable<UserAuth> {
    return this.findByMail(email).pipe(
      switchMap((user: UserAuth) =>
        this.authService.comparePassword(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return user;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findByMail(email: string): Observable<UserAuth> {
    return from(this.userRepository.findOne({ email }));
  }
}
