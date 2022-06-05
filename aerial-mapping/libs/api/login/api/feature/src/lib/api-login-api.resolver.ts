import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginRepository } from '@aerial-mapping/api/login/repository/data-access';
import { AuthGuard } from '@aerial-mapping/api/login/repository/data-access';

@Resolver('Login')
export class LoginResolver {
  constructor(
    @Inject(forwardRef(() => LoginRepository))
    private readonly repo: LoginRepository,
    private readonly authGuard: AuthGuard
  ) { }

  @Query('test')
  @UseGuards(new AuthGuard())
  test() {
    return "Test";
  }

  @Query('getUserByEmail')
  getUserByEmail(@Args('email') email: string) {
    return this.repo.getUserByEmail(email);
  }

  @Query('getAuthStatus')
  getAuthStatus(
    @Context() ctx?: any
  ) {
    if(ctx){
      return this.authGuard.validateToken(ctx.headers.authorization).then((resp) => {
        if(resp != 'Invalid token.') {
          return true;
        }
        console.log(resp)
        return false;
      });
    }
    else {
      console.log("context doesn't exist")
    }
    return false;
  }

  @Mutation('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() ctx?: any
  ) {
    return await this.repo.login(email, password).then((obj) => {
      if(obj.access_token == null){
        return "Invalid credentials";
      }
      ctx.res.cookie('jwt', obj.access_token, { maxAge: 3600*1000 });
      return obj.access_token;
    });
  }

  @Mutation('logout')
  logout(
    @Context() ctx?: any
  ) {
    ctx.res.cookie('jwt', '', { maxAge: 1});
    return 'Logged out!';
  }

}
