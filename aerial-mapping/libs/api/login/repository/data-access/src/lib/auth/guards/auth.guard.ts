import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if(!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  public async validateToken(auth: string) {
    if(auth.split(' ')[0] !== 'Bearer') {
      return "Invalid token.";
    }

    const token = auth.split(' ')[1];
    try {
      return jwt.verify(token, 'secret-key');
    }
    catch(err) {
      return 'Invalid token.';
    }
  }
}
