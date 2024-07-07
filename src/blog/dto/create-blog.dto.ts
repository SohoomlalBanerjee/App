import { IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateBlogDto 
{
    @IsString()
    title: string;

    @IsString()
    description: string;

}
