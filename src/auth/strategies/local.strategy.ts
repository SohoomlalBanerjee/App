import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) 
{
  constructor(private userService: UserService) {
    super({
      usernameField:"email",
      passwordField:"password"
    })
  }

  async validate(email: string, password: string): Promise<User> 
  {
    const user:User=await this.userService.findUserByEmail(email);

    console.log("inside local");
    

    if(user && user.password===password) return user;

    else if(!user) throw new UnauthorizedException("User not found");

    else throw new UnauthorizedException("Invalid credentials");
  }
}