import { PassportStrategy } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";

export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly configService:ConfigService)
    {super(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:
        }
    )}

    validate(payload:Object)
    {
        return payload
    }
}