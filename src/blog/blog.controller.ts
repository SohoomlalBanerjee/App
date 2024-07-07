import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('blog')
export class BlogController 
{
  constructor(private readonly blogService: BlogService) {}

  @Post(':id')
  create(@Body(ValidationPipe) blog: CreateBlogDto,@Param('id') id: number) 
  {
    return this.blogService.create(blog,+id)
  }

  @Get('findUserTodos/:id')
  findAllTodosById(@Param('id') id: number) 
  {
    return this.blogService.findAllByID(+id);
  }

  @Get()
  findOne() 
  {
    return this.blogService.findAll();
  }

  @Patch('updateBlog/:id')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) 
  {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete('deleteBlog/:id')
  remove(@Param('id') id: number) 
  {
    return this.blogService.remove(+id);
  }
}
