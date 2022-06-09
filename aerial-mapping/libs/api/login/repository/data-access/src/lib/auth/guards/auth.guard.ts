import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if(await this.validateToken(ctx.headers.authorization) != 'Invalid token.') {
      return true;
    }
    return false;
  }

  public async validateToken(auth: string) {
    if(auth != undefined && auth != ''){
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
    return 'Invalid token.';
  }

  public async getCurrentUserEmailFromJwt(auth: string) {
    if(auth != undefined && auth != ''){
      if(auth.split(' ')[0] !== 'Bearer') {
        return "Invalid token.";
      }

      const token = auth.split(' ')[1];
      try {
        return JSON.stringify(JSON.parse(jwt.decode(token)!.toString()));
      }
      catch(err) {
        return 'Invalid token.';
      }
    }
    return 'Invalid token.';
  }
}
