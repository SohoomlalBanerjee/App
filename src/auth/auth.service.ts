import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService 
{
    // constructor(
    //     @InjectRepository(User) private readonly userRepository: Repository<User>,
    //   ) {}

    // async signup(user:AuthPayloadDto)
    // {
    //     const{username, email, password }=user
    //     const newUser=new User()
    //     newUser.username=username
    //     newUser.email=email
    //     newUser.password = password;

    //     return this.userRepository.save(newUser)
    // }

    // async validateUser(username: string, password: string): Promise<any> 
    // {
    //     const user:User = await this.userRepository.findOneBy({username});

    //     if (user && await bcrypt.compare(password, user.password)) 
    //     {
    //       const { password, ...result } = user;
    //       return result;
    //     }

    //     return null;
    // }

    // async updateUser(id: number, updateUserDto: AuthPayloadDto): Promise<User> 
    // {
    //     const user: User = new User();
    //     user.username = updateUserDto.username;
    //     user.email = updateUserDto.email;
    //     user.password = updateUserDto.password;
    //     user.id = id;
    //     return this.userRepository.save(user);
    // }


}
