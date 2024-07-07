import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import {Roles} from "src/utils/roles.utils";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')
{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        const ctx=context.switchToHttp()
        const request=ctx.getRequest<Request>()

        for(let i=0;i< Roles.NO_CHECKS.length;i++)
        {
            if(request.url===Roles.NO_CHECKS[i])return true;
        }

        return super.canActivate(context)
    }
}

    