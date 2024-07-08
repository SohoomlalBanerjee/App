import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BlogService 
{

  constructor(@InjectRepository(Blog) private readonly blogRepository:Repository<any>,
              private userService:UserService
  ){}

  async create(blog: CreateBlogDto,userID: number) 
  {
    let newBlog: Blog=new Blog()
    newBlog.title=blog.title
    newBlog.description=blog.description
    newBlog.date=new Date().toLocaleString()
    newBlog.user=await this.userService.findOne(userID)

    return this.blogRepository.save(newBlog)
  }

  findAllByID(userID : number) 
  {
    return this.blogRepository.find({relations:["user"],where:{user:{id:userID}}})
  }

  findAll() 
  {
    return this.blogRepository.find()
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, req:any) 
  {
    console.log(req.user.id);
    const blog = await this.blogRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if(!blog)throw new HttpException("blog not found",404);

    if(blog.user.id!=req.user.id)throw new UnauthorizedException("You can only update your own blogs");
    
    return this.blogRepository.update(id,updateBlogDto)
  }

 async remove(id: number, req:any) 
  {
    const blog = await this.blogRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if(!blog)throw new HttpException("blog not found",404);

    if(blog.user.id!=req.user.id)throw new UnauthorizedException("You can only delete your own blogs");

    return this.blogRepository.delete(id);
  }
}
