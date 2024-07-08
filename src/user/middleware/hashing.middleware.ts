import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware 
{
  async use(req: any, res: any, next: () => void) 
  {
    if (req.body && req.body.password) 
    {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next();
  }
}
