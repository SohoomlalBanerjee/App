import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { UserService } from 'src/user/user.service';

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

  update(id: number, updateBlogDto: UpdateBlogDto) 
  {
    return this.blogRepository.update(id,updateBlogDto)
  }

  remove(id: number) 
  {
    return this.blogRepository.delete(id);
  }
}
