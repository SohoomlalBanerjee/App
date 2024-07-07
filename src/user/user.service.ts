import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/utils/roles.utils';

@Injectable()
export class UserService
{
  constructor(@InjectRepository(User) private readonly userRepository:Repository<any>){}

  create(user: CreateUserDto) 
  {
    let newUser:User=new User()

    const{username, email, password }=user

    newUser.username=username
    newUser.email=email
    newUser.password = password
    newUser.role=Roles.ROLES.NORMAL_ROLE;

    console.log(newUser);
    

    return this.userRepository.save(newUser)
  }

  findAll() 
  {
    return this.userRepository.find();
  }

  findUserByEmail(email:string)
  {
    return this.userRepository.findOne({where:{email:email}})
  }


  findOne(id: number) {
    return this.userRepository.findOneByOrFail({id})
  }

  async update(id: number, updateUserDto: UpdateUserDto) 
  {
    const user:any = await this.userRepository.findOneBy({id})

    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
