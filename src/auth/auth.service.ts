import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { from, Observable, of } from "rxjs";
import { UserAuth } from "src/user/entities/user.entity";
import bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor (private readonly jwtService:JwtService){}

    generateJWT(user:UserAuth): Observable<string> {
        return from(this.jwtService.signAsync({user}))
    }

    hashpassword(password:string):Observable<string>{
        return from<string>(bcrypt.hash(password,12));
    }

    comparePassword(newPassword:string ,passwordHash:string):Observable<any | boolean>{
        return of <any |boolean>(bcrypt.compare(newPassword,passwordHash));
    }
}