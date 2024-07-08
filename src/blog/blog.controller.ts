import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('blog')
export class BlogController 
{
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body(ValidationPipe) blog: CreateBlogDto,@Req() req) 
  {
    const id=req.user.id;
    return this.blogService.create(blog,+id)
  }

  @Get('findUserTodos/')
  findAllTodosById(@Req() req) 
  {
    return this.blogService.findAllByID(req?.user?.id);
  }

  @Get()
  findOne() 
  {
    return this.blogService.findAll();
  }

  @Patch('updateBlog/:id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto,@Req() req:any) 
  {
      return this.blogService.update(+id, updateBlogDto , req);
  }

  @Delete('deleteBlog/:id')
  remove(@Param('id') id: number,@Req() req:any) 
  {
    return this.blogService.remove(+id,req);
  }
}
