import { Controller, Post, Body, UseGuards, Param, Get, Req, UsePipes, Patch } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
// import { LocalGuard } from './guards/local.guards';
// import { JwtAuthGuard } from './guards/jwt.guards';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController 
{
    constructor(private authService:AuthService,
        private JwtService:JwtService){}

    @Post('login')
    @UseGuards(AuthGuard("local"))
    login(@Req() req) 
    {
        const {password,...res}=req.user
        return {token: this.JwtService.sign(res)}
    }

    // @Post('signup')
    // signup(@Body() authPayloadDto:AuthPayloadDto)
    // {
    //    return  this.authService.signup(authPayloadDto)
    // }

}
