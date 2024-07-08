import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/utils/roles.utils';

@Injectable()
export class UserService
{
  constructor(@InjectRepository(User) private readonly userRepository:Repository<any>,
  ){}



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

  getUserProfile(id:number)
  {
    return this.userRepository.findOneByOrFail({id})
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

  async update(id: number, updateUserDto: UpdateUserDto,req:any) 
  {
    if(req.user.id!=id)throw new UnauthorizedException("You can only update your own profile")

    return this.userRepository.update(id,updateUserDto);
  }

  remove(id: number, req:any) 
  {
    if(req.user.id!=id)throw new UnauthorizedException("You can only delete your own profile")
    return this.userRepository.delete(id);
  }
}
