import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from './auth.guard';
import { Auth } from 'aws-amplify';
import { LoginModule } from '../components/login/login.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

Auth.configure({
  region: process.env.REGION,
  userPoolId: process.env.USER_POOL_ID,
  userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID
})

describe('AuthGuard', () => {
  let guard: any;
  let loginComponent: LoginComponent;
  //const routerMock: any = jasmine.createSpyObj('Router', ['navigate']);
  const authMock: any = jasmine.createSpyObj('AWSAmplifyWrapper', ['getAuth']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, LoginModule, HttpClientModule ],
      providers: [ AuthGuard, LoginComponent, HttpClient ]
    }).compileComponents();
    guard = TestBed.inject(AuthGuard);
    loginComponent = TestBed.inject(LoginComponent);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate', (done) => {
    loginComponent.loginForm.controls['email'].setValue("correct@email.com");   //"correct@email.com"
    loginComponent.loginForm.controls['password'].setValue("12345678");
    loginComponent.windowReload = jasmine.createSpy();
    loginComponent.login();
    authMock.getAuth.and.returnValue(true);
    const result: Promise<boolean> = guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{ url: 'dashboard' });
    result.then((resp: boolean) => {
      expect(resp).toBe(true);
      done();
    }).catch(() => {
      done.fail('The promise was rejected.');
    });
  });

});
