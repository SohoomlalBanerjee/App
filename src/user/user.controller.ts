import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController 
{
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) 
  {
    console.log("Create");
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req) 
  {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req)
  {
    return this.userService.getUserProfile(req.user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: number) 
  {
    return this.userService.findOne(+id);
  }

  @Get('getUserByEmail/:email')
  findUser(@Param('id') email: string) 
  {
    return this.userService.findUserByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Req() req:any) 
  {
    return this.userService.update(+id, updateUserDto,req);
  }

  @Delete(':id')
  remove(@Param('id') id: string ,@Req() req:any)
   {
    return this.userService.remove(+id, req);
  }
}
